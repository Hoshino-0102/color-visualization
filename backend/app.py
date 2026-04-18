from openai import OpenAI
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
from skimage import color
from sklearn.cluster import KMeans

import io

app = Flask(__name__)
client = OpenAI(
    api_key="sk-cs7Z9WE5LUaFa2tdUH1jd3Mja1fIQvRr6KKaIEzA0x8FoBYi",
    base_url="https://api.closeai-asia.com/v1"
)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/cluster", methods=["POST"])
def cluster():

    file = request.files["image"]
    k = int(request.form.get("k", 5))
    space = request.form.get("space", "rgb")

    image = Image.open(file.stream)
    image = image.resize((200,200))  # 防止太慢

    pixels = np.array(image).reshape(-1,3)

    pixels = pixels / 255.0

    if space == "lab":
        pixels = color.rgb2lab(pixels)

    kmeans = KMeans(n_clusters=k, n_init=10)
    labels = kmeans.fit_predict(pixels)

    centers = kmeans.cluster_centers_

    if space == "lab":
        centers = color.lab2rgb(centers.reshape(1,-1,3))[0]

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
        model="gpt-4o-mini",
        messages=[
            {"role":"user","content":prompt}
        ]
    )

    answer = completion.choices[0].message.content

    return jsonify({
        "analysis": answer
    })

if __name__ == "__main__":
    app.run(debug=True)