---
title: It's Time for Everyone to Learn About PostCSS
author: davidtheclark
time: '2022-05-07'
lang: zh-CN
---
# It's Time for Everyone to Learn About PostCSS

> 本文翻译自[It's Time for Everyone to Learn About PostCSS. What It Really Is; What It Really Does](https://davidtheclark.com/its-time-for-everyone-to-learn-about-postcss/)

前段时间，我写了另一篇文章[“I'm Excited About PostCSS, But I'm Scared to Leave Sass”](https://davidtheclark.com/excited-about-postcss/)。 从那时起，我就全心全意地接受了 PostCSS（至少暂时离开了 Sass）。 我一直在大型项目中使用 PostCSS，贡献和创作插件，与维护人员交流以了解更多可能的信息； 这一切都一帆风顺。 没错，都很顺利。

与此同时，围绕 PostCSS 的讨论热度越来越高，引发了各种各样的反应——有好奇、兴奋、欢呼、兴奋，也有怀疑、困惑、疲倦、刻毒、保守、刻薄、冷漠、蔑视，等等。

我有两点想引起大家的注意：

其实面对PostCSS我们不必害怕。 处理样式代码的工具数量实际上非常少（至少在我作为一位 JavaScript 编写者看来是这样的）。 增加更多的可能性不会伤害任何人或事。
每个编写 CSS 的人都应该了解 PostCSS 是什么——它到底是什么，以及它可以用来做什么（不只是那些胆怯、反应过度的人所说的那样）——总之不管你现在是否最终使用它。 因为如果你认为 PostCSS 只是 Sass 和 Less 的替代品，那你就陷入误区了。

对于第一点其实我也没法再多说什么了……大概只能是一些安慰的话、教练式的鼓励、温和的刺激和观点？ 在这种情况下，我可能不是最好的顾问。

所以我们还是把目光放在第二点上，这方面我可能能够为你们提供帮助。 与 PostCSS 合作了一段时间后，我想我学到了一些值得分享的东西。

----

## 当我们在谈论PostCSS时，我们究竟在说什么？

当谈及PostCSS时，我们就不得不提两样东西：

1. [PostCSS](https://github.com/postcss/postcss)这个工具本身。我们可以通过npm install postcss来获取它
2. 由PostCSS驱动的[ PostCSS 插件生态系统](https://github.com/postcss/postcss#plugins)。

PostCSS本身是一个将 CSS 解析为[抽象语法树 (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)的 Node.js 模块；通过任意数量的“插件”函数（“plugin” functions）传递该 AST； 然后将该 AST 转换回字符串，您可以将其输出到文件中。 AST 通过的每个函数可能会或不会转换它；同时将会生成源映射（sourcemap）以跟踪任何更改。

AST 提供了一个简单的 API，开发人员可以使用它来编写插件。 例如，您可以使用 css.eachRule() 循环遍历文件中的每个CSS规则集合，或者使用 rule.eachDecl() 循环遍历规则中的每个声明。 您可以使用 rule.selector 获取规则的选择器，或者使用 atRule.name 获取规则的名称。 从以上几个示例中，您可以看到 PostCSS API 使使用 CSS 源代码变得非常容易（比依赖正则表达式更简单更准确）。

这就是 PostCSS 目前所做的一切：它不会改变你的 CSS。 不过一个插件有可能会做到这一点。 PostCSS 插件几乎可以用解析后的 CSS 做任何它们想做的事情。 有的插件可以启用变量或其他一些有用的语言扩展， 有的插件可能会改变你对 ks 的所有看法。 有的插件可能会在每次您使用 ID 选择器时记录警告。 有的插件可以将 Masonic ASCII  art添加到样式表的顶部。 有的插件可以记录您使用float声明的次数。还有很多很多插件，我们面对的是星辰大海。

PostCSS 可以支持无限多种插件来读取和操作您的 CSS。 这些插件并不需要一个统一的议程规范，它们最大的共同点就是都能解决您面对的问题。

有一点需要注意，PostCSS本身和它的插件生态系统都不是 Sass 和 Less 的直接类似物。 但是，通过集成一组用于将作者友好（Author Friendly）的CSS转换为浏览器友好（Brower Friendly）的 CSS的插件，我们其实就能够达到和CSS预处理器类似的效果。

请记住，这些“插件包”只是生态系统的成员之一，就像所有未打包的插件一样。 没有任何给定的插件或插件包可以代表整个PostCSS。我们反而有一个由许多单独的模块组成（由 PostCSS 提供支持）的PostCSS生态系统，这个生态系统会不断地成长。

----

## PostCSS 模块化的含义

### 我们不应一昧地坚持认为“ PostCSS 是（或应该是）“后处理器”（PostProcessor），而不是类似于Sass 和 Less的“预处理器”（PreProcessor）”。

无论您对“后处理器”和“预处理器”的定义是什么，都会有属于这两个阵营的 PostCSS 插件。 根据大多数定义，[Autoprefixer](https://github.com/postcss/autoprefixer) 是一种标志性的“后处理器”风格插件； 但也有类似[ postcss-each](https://github.com/outpunk/postcss-each) 这种其实非常有“预处理器”风格的插件。

还有一些插件根本不会改变你的 CSS，比如 [stylelint](https://stylelint.io/) 和[postcss-bem-linter](https://github.com/postcss/postcss-bem-linter) 和 [list-selectors](https://github.com/davidtheclark/list-selectors)。

如果你想在你自己的构建的过程中保持一些纯净的改变，那么请只使用 PostCSS 插件进行你所认为的“后处理”。无论怎么样，我们需要认真地挑选PostCSS插件。

### 我们不应试图将PostCSS与特定的语法扩展或转换联系起来

PostCSS 是一个低层次模块，便于创建其他工具； 并且创建出的高级工具（插件）可以用来做什么并没有限制。

所以 PostCSS 不再是关于允许您编写未来的 CSS（来自规范草案的语法和函数），而是关于提供循环Loop和条件Conditionals以及其他类似于 Sass 的功能。 有单独的插件可以分别做到这两点，也有插件包可以同时做到这两点（[cssnext](http://cssnext.io/)和[precss](https://github.com/jonathantneal/precss)）。但无论是哪一种，都不代表 PostCSS 的上限。

### 当人们认为他们在批评PostCSS时，他们可能实际是在批评某个特定的插件、插件包或使用特定插件的特定方式。

这很好——可以批评——但不要因为其中一个错误地惹恼了你，就自欺欺人地拒绝其他基于 PostCSS 的工具。

### 您可以随时选择添加或删除任何 PostCSS 插件。

每个插件只是你构建过程的一部分。 如果插件让您不快，请将其删除即可。 没有人会阻止你。

但请记住，某些插件可以以多种方式使用，也许您通过不同的方式使用插件可以平息您的不满。

也许你，像 [Chris Eppstein](https://twitter.com/chriseppstein/status/618515591582724096) 一样，不喜欢在[postcss-define-property](https://github.com/daleeidd/postcss-define-property) 插件里创建看起来像真实的标准属性的新属性。 好吧，这其实有一个非常简单的解决方案：创建看起来与真实的标准属性不完全相同的新属性。

### 插件是相对较小的模块，因此它们应该对反馈做出响应并且易于贡献。

如果您认为插件需要更好的示例或新选项，您可以做出贡献。

### 您始终可以构建自己的插件来满足自己的需求。

嗯，这是非常重要的一点，自然不必多说。这使得 PostCSS 新奇而美妙——你可以轻松地尝试完全不同的东西。

或者你可以稍微调整一下已有的插件。 如果某些插件使用您喜欢的语法但您讨厌的功能，请创建具有“正确”功能的衍生插件。 如果其他插件提供了您喜欢的功能但您讨厌语法，请使用“正确”语法创建一个衍生插件。 当人们看到你的工作并抱怨你的插件时，你总是可以建议他们按照自己的方式编写。

（冒着听起来荒谬和浮夸的风险……）我建议，对于许多设计师和前端开发人员来说，真正学习 PostCSS 应该揭开 CSS 处理领域的神秘面纱。 Sass 和 Less 提供的所有功能——它不是魔法：它不一定是那样的：那些只是幕后的人，虽然他们可能很聪明而且很努力，但你不必假设他们比你更清楚什么最适合你的情况。

----

## PostCSS解决的问题

使用 PostCSS 提醒我 CSS 处理的存在是为了解决问题；几乎所有问题都有多种解决方案；而且我可能有资格在替代解决方案之间进行选择，甚至可以构建自己的解决方案。

在 PostCSS 的驱动下，我一直在首先解决我自己的 CSS 需求问题——类似于我处理 JavaScript 的方式。在我真正知道发生了什么之前，我不会一头栽进庞大的图书馆里寻找资料，而是首先考虑需要解决的实际问题；然后我考虑现有的解决方案；然后我要么使用现有的解决方案，要么想一个自己的解决方案。

我认为这个过程非常有趣。

另外，我认为它帮助我简化了 CSS 方法。请记住——尽管这似乎是很久以前的事了——许多开发人员曾在某个时候拒绝采用 Sass 和 Less，因为他们担心“预处理器”没有解决足够多的实际问题来实现他们可能会增加的复杂性。

我从来没有真正赞同过（也许是因为我从不介意我的构建过程有一点复杂性）；但我确实接受批评并承认，如果您不觉得某个工具可以解决问题，那么您就没有兴趣使用该工具。

我构建（并继续维护）了一个重要的 Sass 实用工具库，因为它解决了我之前工作中的重要问题，我不得不快速解决大量 CSS。现在我有了一份新工作，又在面对不同的问题（例如[可扩展性](https://github.com/davidtheclark/scalable-css-reading-list)，以及奇怪的、独特的要求）；对于我目前的需求，我发现自己更喜欢 CSS 的简约方法，至少涉及到与处理一样多的分析。我还想限制我的团队可以使用的权力，只选择性地包括非标准功能。 PostCSS，这个工具和生态系统非常适合我当前的需求。

----

## 该结束啦

我打算写另一部分，叫做“Now, for kicks, let’s address some ill-conceived criticisms of PostCSS.”  但我认为这篇文章已经够长了。 而且我认为聪明的读者已经明白我的大多数反驳会是什么样子。 如果您确实想要看看我的回复，请在[@davidtheclark](https://twitter.com/davidtheclark) 上给我发推文，我会在推文上回复您。