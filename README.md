# 🎨 图片颜色聚类可视化

> 基于 K-Means + AI 的图片主色调分析与可视化系统

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-green.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-2.0+-lightgrey.svg)](https://flask.palletsprojects.com/)
[![ECharts](https://img.shields.io/badge/echarts-5.0+-orange.svg)](https://echarts.apache.org/)

## 📸 效果预览

<p align="center">
  <img src="screenshots/demo1.png" width="45%" alt="饼图效果">
  <img src="screenshots/demo2.png" width="45%" alt="柱状图效果">
</p>

## ✨ 功能特点

- 🖼️ **图片上传与预览**：支持任意图片格式，实时预览
- 🎯 **智能聚类分析**：使用 K-Means 算法提取图片主色调
- 📊 **多维度可视化**：支持饼图 / 柱状图切换，直观展示颜色占比
- 🎨 **双颜色空间**：支持 RGB 和 LAB 两种颜色空间聚类
- ⚙️ **交互式调节**：可动态调整聚类数量 K（3-10）
- 🤖 **AI 色彩评价**：调用大语言模型分析颜色搭配和谐度

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| **前端** | HTML5 · CSS3 · JavaScript · ECharts |
| **后端** | Python · Flask |
| **算法** | Scikit-learn (K-Means) · scikit-image |
| **AI** | DeepSeek API / Ollama 本地模型 |

## 📁 项目结构

```
color-visualization/
├── backend/
│   ├── app.py              # Flask 后端服务
│   └── .env                # API 配置文件（需自行创建）
├── frontend/
│   ├── index.html          # 主页面
│   ├── main.js             # 核心交互逻辑
│   ├── kmeans.js           # 前端聚类实现（备用）
│   ├── color.js            # 颜色处理工具
│   └── style.css           # 现代化 UI 样式
├── images/                 # 示例图片
├── screenshots/            # 效果截图
└── README.md
```

## 🚀 快速开始

### 1️⃣ 克隆项目
```bash
git clone https://github.com/你的用户名/color-visualization.git
cd color-visualization
```

### 2️⃣ 安装后端依赖
```bash
cd backend
pip install flask flask-cors pillow numpy scikit-learn scikit-image python-dotenv openai
```

### 3️⃣ 配置 API Key（二选一）

**选项 A：使用 DeepSeek API（推荐）**
1. 在 `backend` 目录下创建 `.env` 文件
2. 写入：`DEEPSEEK_API_KEY=你的API密钥`
3. 获取密钥：https://platform.deepseek.com/

**选项 B：使用 Ollama 本地模型**
```bash
# 安装并启动 Ollama
ollama pull qwen2.5:0.5b
ollama serve
```
然后修改 `app.py` 中的 `base_url` 为 `http://localhost:11434/v1`

### 4️⃣ 启动服务

**启动后端：**
```bash
cd backend
python app.py
# 服务运行在 http://127.0.0.1:5000
```

**启动前端：**
```bash
cd frontend
python -m http.server 8000
# 访问 http://localhost:8000/index.html
```

## 📖 使用说明

1. 点击「上传图片」选择一张图片
2. 调整聚类数量 K（默认 5）
3. 选择颜色空间（RGB / LAB）
4. 选择图表类型（饼图 / 柱状图）
5. 点击「Analyze」开始分析
6. 查看聚类结果和 AI 色彩评价

## 🎯 核心算法

### K-Means 聚类流程
```
1. 读取图片像素 RGB 值
2. 可选转换为 LAB 颜色空间
3. 随机初始化 K 个聚类中心
4. 迭代分配像素并更新中心
5. 返回 K 个主色调及像素占比
```

### AI 色彩分析
- 将 K 个主色调 RGB 值发送给大模型
- 模型从色彩理论角度评价搭配和谐度
- 返回中文评价及原因分析

## 📊 课程要求完成度

| 要求项 | 状态 |
|--------|------|
| 图片像素颜色聚类（K ≥ 5） | ✅ |
| 显示聚类中心颜色与数量 | ✅ |
| ECharts 可视化展示 | ✅ |
| 交互式选择 K 值 | ✅ |
| 多图片支持 | ✅ |
| 切换可视化样式 | ✅ |
| RGB / LAB 颜色空间切换 | ✅ |
| AI 大模型颜色评价 | ✅ |

## 🙋‍♂️ 作者

**郭炫麟** · 10245102503

数据可视化课程大作业 · 2025

## 📄 开源协议

本项目仅供学习交流使用。

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
```

## 使用说明

1. **替换占位符**：
   - `https://github.com/你的用户名/color-visualization.git` → 你的实际仓库地址
   - 截图路径 `screenshots/demo1.png` → 确保你有这两张截图

2. **截图准备**：
   - 运行你的项目，分别截取饼图和柱状图的效果
   - 在项目根目录创建 `screenshots` 文件夹，放入截图

3. **提交到 GitHub**：
   ```bash
   git add .
   git commit -m "Add README and screenshots"
   git push origin main
   ```

4. **可选**：添加 License 文件
   - 在根目录创建 `LICENSE` 文件，写入 MIT 协议文本（我可以提供）