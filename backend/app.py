import os
from dotenv import load_dotenv
from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from skimage import color
from sklearn.cluster import KMeans

import io

load_dotenv()
api_key = os.getenv("DEEPSEEK_API_KEY")

app = Flask(__name__)
client = OpenAI(
    api_key=api_key,
    base_url="https://api.deepseek.com/v1"
)
CORS(app)  # 允许所有来源的跨域请求

@app.route("/cluster", methods=["POST"])
def cluster():

    file = request.files["image"]
    k = int(request.form.get("k", 5))
    space = request.form.get("space", "rgb")

    image = Image.open(file.stream)
    max_size = 200
    image.thumbnail((max_size, max_size), Image.Resampling.LANCZOS)

    pixels = np.array(image).reshape(-1,3)

    pixels = pixels / 255.0

    if space == "lab":
        pixels = color.rgb2lab(pixels)

    kmeans = KMeans(n_clusters=k, n_init=10)
    labels = kmeans.fit_predict(pixels)

    centers = kmeans.cluster_centers_

    if space == "lab":
        centers = color.lab2rgb(centers)

    centers = (centers * 255).astype(int)

    counts = np.bincount(labels)

    result = []

    for i in range(k):
        result.append({
            "color": centers[i].tolist(),
            "count": int(counts[i])
        })

    return jsonify(result)
@app.route("/harmony", methods=["POST"])
def harmony():

    colors = request.json["colors"]

    prompt = f"""
    以下是图片的主颜色RGB：
    {colors}

    请判断这些颜色组合是否和谐。
    用一句中文评价，并给出原因。
    """

    completion = client.chat.completions.create(
        model="deepseek-chat",  # DeepSeek 的对话模型
        messages=[{"role":"user","content":prompt}]
    )

    answer = completion.choices[0].message.content

    return jsonify({
        "analysis": answer
    })

if __name__ == "__main__":
    app.run(debug=True)