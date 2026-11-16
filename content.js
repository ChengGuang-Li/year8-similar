/* Section 6.5.3 only. Source: Jacaranda Maths Quest 8, printed pp. 273–278.
   All diagrams are redrawn. English student pages; Chinese teacher notes. */
(function () {
  "use strict";
  const g=window.GEOMETRY;
  window.LESSON={
    meta:{title:"Similar shapes",unit:"6.5.3 · Shape, scale & similarity",yearLevel:"Year 8 Mathematics",mark:"~"},
    slides:[
      {
        type:"opening",title:"Similar shapes",eyebrow:"Year 8 Mathematics · 6.5.3",
        questionLabel:"Today's question",question:"What changes when a shape is resized?",diagram:g.cover(),
        recall:{label:"Think back",text:"What tells you that two shapes have the same shape?"},
        goals:["Match corresponding sides and angles.","Find and use the scale factor, k.","Justify triangle similarity using a test."],
        phase:"Launch · 1 min",notes:"本课只讲 6.5.3（教材印刷页 273–278），不展开 6.5.1、6.5.2 的全等判定或 6.5.4 软件操作。精简为 12 页，约 25–30 分钟，按讨论情况调整。先问学生：缩放后哪些量改变、哪些不变？允许猜测，先不报公式。N 开关备注，Slides 跳页，方向键翻页。"
      },
      {
        type:"geometry",title:"Which copy keeps the shape?",eyebrow:"Notice · discuss",
        visual:g.squares("hook"),caption:"Lengths are labelled. Decide before revealing.",
        prompt:"Original: 4 × 4. Copy A: 8 × 8. Copy B: 8 × 4. Which copy is similar?",
        steps:[{label:"Copy A",body:"Both corresponding side lengths use the same scale factor: 8 ÷ 4 = 2."},{label:"Copy B",body:"The width doubles, but the height stays the same. The shape is stretched."}],
        takeaway:"Use the same scale factor for every corresponding side.",
        phase:"Launch · 2 min",notes:"先选 A 或 B，再与同桌解释。追问：两图都有四个直角，为什么 B 仍不相似？必须同时看对应边比例。依次揭示，听到“都乘 2”再进入定义。不要把角相等误推广为所有多边形的充分条件。"
      },
      {
        type:"geometry",title:"Same shape. Same scale factor.",eyebrow:"Understand · similarity & scale factor",
        visual:g.squares("formula"),caption:"Object = original square. Image = scaled square. All angles remain 90°.",
        prompt:"Corresponding angles are equal. Corresponding sides have the same scale factor.",
        formula:'<div class="scale-formula"><i>k</i><span>=</span><span class="fraction"><span>image side length</span><span>object side length</span></span></div>',
        steps:[{label:"Image ÷ object",body:"k = 10 ÷ 4 = 2.5. The scale factor has no units."},{label:"Use the same scale factor",body:"Each image side is 4 × 2.5 = 10 cm."}],
        takeaway:"Image side length = object side length × k.",
        phase:"Understand · 3 min",notes:"合并原第 3、5 页，只讲一次相似定义与公式。前面的例子统一使用正方形：原图每边 4 cm，像每边 10 cm。先指出对应角相等，再算 10/4；另一组对应边也用同一 scale factor。强调 image 是终点、object 是起点，不用大除以小的口诀。单位需先统一，k 无单位。k = 1 也是相似，大小相同时还全等。"
      },
      {
        type:"geometry",title:"Match the sides. Find k.",eyebrow:"Understand · corresponding sides & scale factor",
        visual:g.trianglePair("match"),caption:"Left: object. Right: image. The image is turned.",
        prompt:"Small → large: what is the scale factor?",
        steps:[
          {label:"Pair the corresponding sides",pairs:[{object:"AB = 3",image:"ED = 4.5",tone:"a"},{object:"BC = 4",image:"DF = 6",tone:"b"},{object:"AC = 5",image:"EF = 7.5",tone:"c"}]},
          {label:"Image ÷ object",body:"4.5 ÷ 3 = 6 ÷ 4 = 7.5 ÷ 5",emphasis:"k = 1.5"}
        ],
        takeaway:"Keep the same direction for every ratio: image ÷ object.",
        phase:"Understand · 2 min",notes:"先找 B、D 的直角，再用边的颜色和长度配对。第 01 步呈现有数值的对应边表，不单独堆 A ↔ E 等字母。请学生先算三组 image/object 比值；第 02 步揭示 k = 1.5，同时图中出现 ×1.5 箭头和 △ABC ∼ △EDF。说明顶点对应仍为 A 对 E、B 对 D、C 对 F，因此相似式按 EDF 顺序写。大到小的 scale factor 则为 2/3，本页明确只求小到大。"
      },
      {
        type:"scaleLab",title:"Scale up or scale down",eyebrow:"Explore · live scale model",
        prompt:"Choose scale up or scale down, then predict the new side length.",
        phase:"Explore · 4 min",notes:"同一页提供两个独立功能。Scale up：原图每边 4，只能选择 k > 1，默认 k = 2，得到每边 8。Scale down：原图每边 8，只能选择 0 < k < 1，默认 k = 0.5，得到每边 4。先让学生预测，再拖各自滑块或点预设。切换功能保留各自的数值，Reset 只重置当前功能。两种模式都只显示 object → image 的一条箭头，保持公式方向清楚。共同规律：所有边用同一 scale factor，角度始终为 90°。"
      },
      {
        type:"geometry",title:"SSS: compare all three pairs",eyebrow:"Triangle similarity · 1 of 4",
        visual:g.trianglePair("sss"),caption:"Side–side–side · compare corresponding sides.",
        prompt:"Can side lengths alone establish that these triangles are similar?",
        steps:[{label:"Match corresponding sides",body:"3 ↔ 6, 4 ↔ 8, 5 ↔ 10."},{label:"Compare all three ratios",body:"6/3 = 8/4 = 10/5 = 2."},{label:"Conclude",body:"Similar by SSS: all three side pairs are proportional."}],
        takeaway:"SSS similarity needs equal ratios. The sides do not need equal lengths.",
        phase:"Triangle tests · 2 min",notes:"截图第一行，必须算三对比例。此页没有给角标记，不能仅凭看起来直角就引用直角。SSS 是完整判定，三边成比例后不必另量角。与旧知 SSS 全等区别：这里比较比例。"
      },
      {
        type:"geometry",title:"SAS: the angle must be between",eyebrow:"Triangle similarity · 2 of 4",
        visual:g.trianglePair("sas"),caption:"Side–angle–side · the marked angle is the included angle.",
        prompt:"Use the large triangle as the object and the small triangle as the image.",
        steps:[{label:"Compare the two side pairs",body:"1.5/12 = 2/16 = 1/8."},{label:"Check the included angle",body:"The angle between those sides is 90° in each triangle."},{label:"Conclude",body:"Similar by SAS. Large → small has k = 1/8."}],
        takeaway:"Two proportional side pairs + an equal included angle = SAS similarity.",
        phase:"Triangle tests · 2 min",notes:"截图第二行。请学生指两条已知边交汇处，确认夹角。大到小 k = 1/8，小到大 k = 8，需说明方向。非夹角不能直接套 SAS，判断时先指出夹角。"
      },
      {
        type:"geometry",title:"AAA: equal angles fix the shape",eyebrow:"Triangle similarity · 3 of 4",
        visual:g.trianglePair("aaa"),caption:"Angle–angle–angle · often shortened to AA.",
        prompt:"No side lengths are given. Is there enough information?",
        steps:[{label:"Match the angles",body:"90° ↔ 90°, 60° ↔ 60°, 30° ↔ 30°."},{label:"Conclude",body:"The triangles are similar by AAA."},{label:"Why two angles are enough",body:"If two angle pairs match, the third must match: the total is 180°. This is AA."}],
        takeaway:"Equal angles prove triangle similarity. They do not determine the size.",
        phase:"Triangle tests · 2 min",notes:"截图第三行，保留教材 AAA 名称，也认可 AA。问为什么不用量边。只简短对比：相同角度确定形状、不能确定大小，因此 AAA 不是全等判定。不能推广到任意多边形。"
      },
      {
        type:"geometry",title:"RHS: start with the right angles",eyebrow:"Triangle similarity · 4 of 4",
        visual:g.trianglePair("rhs"),caption:"Right angle–hypotenuse–side · hypotenuse = side opposite 90°.",
        prompt:"What evidence is given in these right-angled triangles?",
        steps:[{label:"Right angle",body:"Each triangle has a marked 90° angle."},{label:"Hypotenuse and a matching side",body:"Hypotenuses: 6/3 = 2. Matching legs: 4/2 = 2."},{label:"Conclude",body:"The triangles are similar by RHS."}],
        takeaway:"Both must be right-angled; hypotenuse and a matching leg must share a ratio.",
        phase:"Triangle tests · 2 min",notes:"截图第四行。先找斜边：在直角对面，不按画得斜不斜判断。斜边 3、6 和对应直角边 2、4 比例同为 2。未标底边不用算，不引入勾股。"
      },
      {
        type:"reference",title:"Four ways to prove similarity",eyebrow:"Keep this · reference summary",
        prompt:"Use one complete test. You do not need to check every property again.",
        rows:[
          ["SSS","Three proportional side pairs.","Compare all three ratios."],
          ["SAS","Two proportional side pairs + equal included angle.","Check the angle between the sides."],
          ["AAA / AA","Two equal angle pairs; the third follows.","Shape is fixed; size can vary."],
          ["RHS","Right angles + proportional hypotenuse and matching leg.","Find the hypotenuse first."]
        ],phase:"Consolidate · 1 min",notes:"截图四行表格的课堂版总结，可从 Slides 随时跳回。学生用一句话说每种判定需要的证据。用一个完整判定即可，不必同时验证四种。保留 AAA，也认可 AA。"
      },
      {
        type:"geometry",title:"Parallel lines reveal similar triangles",eyebrow:"Apply · nested shapes",
        visual:g.nested(),caption:"Given: BE ∥ CD. B lies on AC and E lies on AD.",
        prompt:"Given BE ∥ CD, explain why △ACD ∼ △ABE.",
        steps:[{label:"A shared angle",body:"∠CAD = ∠BAE: the same angle at A."},{label:"Parallel lines give equal angles",body:"∠ACD = ∠ABE",emphasis:"∠ADC = ∠AEB"},{label:"Write the matching order",body:"△ACD ∼ △ABE by AAA / AA."}],
        takeaway:"Parallel lines and a shared angle can establish triangle similarity.",
        phase:"Apply · 2 min",notes:"对应教材例 16。第 01 步讲公共角 A。第 02 步时，∠ADC 和 ∠AEB 同时出现黄色扇形及相同双角弧，与右侧黄色等式对应；在此之前这对黄色标记隐藏，Reset 后重新隐藏。∠ACD 与 ∠ABE 保留相同的单角弧。学生先描大、小三角形；平行标记是已知，不能仅凭看起来平行就推相似。"
      },
      {
        type:"geometry",title:"Find the building height",eyebrow:"Application · reveal one step at a time",
        visual:g.sightline(),caption:"Level ground. Vertical tree and building. Distances start at the viewer.",
        prompt:"Use similar triangles to find h.",focusSteps:true,
        steps:[
          {label:"Identify the similar triangles",body:"Both have a right angle and share the viewing angle.",emphasis:"AA similarity"},
          {label:"Find the small triangle height",body:"Subtract the eye height from the tree height.",emphasis:"4.5 − 1.5 = 3 m"},
          {label:"Find the scale factor",body:"Compare the horizontal distances, large ÷ small.",emphasis:"k = 30 ÷ 5 = 6"},
          {label:"Scale the height above eye level",body:"Use the same scale factor for the two triangle heights.",emphasis:"3 × 6 = 18 m"},
          {label:"Add the eye height",body:"Include the part of the building below eye level.",emphasis:"h = 18 + 1.5 = 19.5 m"}
        ],
        phase:"Application · 4 min",notes:"合并原第 12、13 页。每次 Reveal 仅显示当前步骤，同时左图只高亮该步骤的对应线条：01 两个直角三角形与公共视角；02 树高 4.5 m、眼高 1.5 m 及树在眼高以上的部分；03 水平距离 30 m 与 5 m；04 两个三角形在眼高以上的竖直高度；05 楼总高与应加回的眼高。先让学生预测每步结果再揭示。Previous step 可返回，Reset 隐藏所有解答与高亮。强调 18 m 是眼高以上的高度，楼总高为 19.5 m。"
      }
    ]
  };
}());
