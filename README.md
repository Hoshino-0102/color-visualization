# 🎨 图片颜色聚类可视化系统（Image Color Visualization）

## 一、项目简介

本项目为《数据可视化》课程课后大作业。

系统通过 **K-Means 聚类算法** 对图片像素颜色进行分析，提取图片中的主色调，并使用交互式图表进行可视化展示。同时结合 **AI 大语言模型** 对颜色搭配进行智能评价，实现算法分析与人工智能辅助设计的结合。

---

## 二、功能展示

### ✅ 基本功能

* 图片上传与预览
* 图片像素颜色聚类（K-Means，K ≥ 5）
* 显示每类颜色中心（平均颜色）
* 统计各颜色像素数量
* ECharts 可视化展示

### ✅ 交互功能（进阶要求）

* 可交互调整聚类数量 K
* 可切换颜色空间（RGB / LAB）
* 可切换可视化方式（饼图 / 柱状图）
* 支持不同图片分析

### ✅ AI 扩展功能（附加要求）

* 调用大语言模型分析颜色搭配
* 自动生成颜色和谐度评价
* 给出色彩设计建议

---

## 三、系统架构

```
用户上传图片
        ↓
前端（JavaScript）
        ↓
Flask 后端
        ↓
K-Means 聚类分析
        ↓
颜色数据返回
        ↓
ECharts 可视化
        ↓
AI 大模型颜色评价
```

---

## 四、项目结构

```
color-visualization
│
├── backend/        # Flask 后端
│   └── app.py
│
├── frontend/       # 前端页面
│   ├── index.html
│   ├── main.js
│   ├── color.js
│   ├── kmeans.js
│   └── style.css
│
├── images/         # 示例图片
├── screenshots/    # 运行截图
└── README.md
```

---

## 五、运行方法

### 1️⃣ 启动后端

进入 backend 目录：

```bash
cd backend
python app.py
```

默认地址：

```
http://127.0.0.1:5000
```

---

### 2️⃣ 启动前端

进入 frontend 目录：

```bash
python -m http.server
```

浏览器打开：

```
http://localhost:8000/index.html
```

---

## 六、使用说明

1. 上传图片
2. 设置聚类数量 K
3. 选择颜色空间（RGB / LAB）
4. 选择图表类型
5. 点击 **Analyze**
6. 查看颜色分布及 AI 评价结果

---

## 七、关键技术

### 前端

* HTML5
* CSS3
* JavaScript
* ECharts 可视化库

### 后端

* Flask
* NumPy
* Scikit-learn（K-Means）
* scikit-image（颜色空间转换）

### 人工智能

* OpenAI 兼容 API
* 大语言模型颜色分析

---

## 八、可视化示例

（此处插入运行截图）

```
screenshots/demo1.png
screenshots/demo2.png
```

---

## 九、课程要求对应情况

| 作业要求         | 完成情况 |
| ------------ | ---- |
| 图片颜色聚类       | ✅    |
| 显示颜色均值       | ✅    |
| 显示像素数量       | ✅    |
| ECharts 可视化  | ✅    |
| 可交互选择 K      | ✅    |
| 多图片支持        | ✅    |
| 图表切换         | ✅    |
| RGB / LAB 切换 | ✅    |
| AI 大模型分析     | ✅    |

---

## 十、作者信息

姓名：郭炫麟
学号：10245102503

课程：数据可视化
作业：图片像素颜色可视化系统

---

## 十一、GitHub Pages

在线演示地址：

```
https://你的用户名.github.io/color-visualization/
```

---

## 十二、项目说明

本项目旨在探索：

* 数据可视化技术
* 图像颜色分析
* 聚类算法应用
* 人工智能辅助设计

通过将算法分析与 AI 评价结合，实现具有实际应用价值的可视化系统。
