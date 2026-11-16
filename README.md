# year8-similar

Year 8 Mathematics · 6.5.3 Similar shapes

Year 8 网站 PPT，共 17 页。学生页面英文，每页附中文教师备注。教学约 30–35 分钟，可按课堂讨论调整。

内容依据本地 `c06Congruence.pdf` 中 **6.5.3 Similar shapes**（印刷页 273–278），包含对应边与对应角、scale factor 的方向与计算、放大与缩小、SSS/SAS/AAA（AA）/RHS、求未知边、平行线判定相似及视线应用。所有图形重新绘制为 SVG，仓库与构建产物不需要教材 PDF 或截图。

## 本地打开

直接双击 `index.html` 即可离线使用。也可以在此目录运行：

```sh
npm run dev
```

打开 <http://localhost:4173>。不需要安装依赖，不使用 CDN、在线字体或第三方 API。

## 上课操作

| 操作 | 按键 / 按钮 |
| --- | --- |
| 上一页 / 下一页 | ← / →，Page Up / Page Down，页脚按钮 |
| 首尾页 | Home / End |
| 教师备注 | N / Notes；Esc 关闭 |
| 目录跳页 | Slides |
| 全屏展示 | Present；Esc 退出浏览器全屏 |
| 逐步讲解 | Reveal reasoning / Reveal next step |
| 练习答案 | 每题独立 Reveal model response |
| 重新演示 | Reset；缩放模型可用预设或滑块 |
| 打印教师版 | 浏览器打印，A4 横向，每页一张，自动显示答案 |

备注显示在当前屏幕上，投影时需要时再打开。选择题必须先选一个选项，再点击 Check the reasoning。翻页会保留本次的作答和揭示状态；刷新可全部复位。页码保存在 URL，例如 `#slide-9` 可直接打开 SSS。

第 4 页先揭示对应边表，第 02 步再显示三组比值、`k = 1.5` 和图中的 `×1.5` 箭头。第 15 页的 ∠AEB、∠ADC 黄色双角弧在第 02 步同步出现；Reset 会同时隐藏图中标记和解答。

## GitHub → Vercel

将 **这个 `similar-shapes` 目录里的内容** 作为 GitHub 仓库根目录上传，保留 `scripts/`。不需要上传原教材。

在 Vercel 导入 GitHub 仓库，项目配置为：

- Framework Preset：**Other**
- Root Directory：仓库根目录；若整个 `year8` 都上传，则选 **similar-shapes**
- Build Command：**npm run build**
- Output Directory：**dist**

`vercel.json` 已声明构建与输出设置。无需环境变量。

本地验证生产文件：

```sh
npm run build
npm run preview
```

## 修改内容

- `content.js`：教学顺序、文字、答案、教师备注。
- `geometry.js`：SVG 数学图形、缩放模型和专用教学交互。
- `geometry.css`：数学图形布局、移动端与打印补充样式。
- `theme.css` / `deck.js`：通用课件主题与导航。

第 1–8 页用同一组正方形例子建立相似与 scale factor，再过渡到对应关系与求未知边；第 9–14 页讲解四种判定及汇总；第 15 页用平行线证明相似；第 16–17 页为视线应用。原第 3、5 页已合并，原第 8 页的重复概念并入导入页；原第 11、18、20、21、24、25 页已删除。未包括 6.5.1、6.5.2 的系统教学或 6.5.4 的软件操作。
