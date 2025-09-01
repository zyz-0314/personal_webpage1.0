const quoteList = [
    {
        saying: "He said one day you'll leave this world behind, so live a life you will remember.",
        author: "-「Avicii」"
    },
    {
        saying: "Patience is key in life.",
        author: "-「Jared McCain」"
    },
    {
        saying: "上帝借各种途径使人变得孤独，好让我们可以走向自己。",
        author: "-「赫尔曼.黑塞《荒原狼》」"
    },
    {
        saying: "黎明以后，世人将开始新的旅程，他们要去的天地从此与我永远无关痛痒。",
        author: "-「阿尔贝.加缪《局外人》」"
    },
]

let lastIndex = -1; //记录上一次的索引

function renderRandomQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quoteList.length);
    } while (randomIndex === lastIndex && quoteList.length > 1);

    lastIndex = randomIndex;
    const randomQuote = quoteList[randomIndex];
    const sayingElement = document.querySelector(".saying");
    const authorElement = document.querySelector(".author");
    const quoteBox = document.querySelector(".quote");

    //记录当前高度
    const startHeight = quoteBox.offsetHeight;

    //临时更新内容，计算新高度
    sayingElement.textContent = `"${randomQuote.saying}"`;
    authorElement.textContent = randomQuote.author;

    const newHeight = quoteBox.offsetHeight;

    //先回到旧内容和旧高度
    sayingElement.textContent = sayingElement.dataset.oldSaying || sayingElement.textContent;
    authorElement.textContent = authorElement.dataset.oldAuthor || authorElement.textContent;
    quoteBox.style.height = startHeight + "px";

    //淡出旧内容
    sayingElement.classList.add("fade-out");
    authorElement.classList.add("fade-out");

    //切换到新高度并淡入新内容
    setTimeout(() => {
        //保存当前文本，便于下次回退
        sayingElement.dataset.oldSaying = `"${randomQuote.saying}"`;
        authorElement.dataset.oldAuthor = randomQuote.author;

        //更新内容
        sayingElement.textContent = `"${randomQuote.saying}"`;
        authorElement.textContent = randomQuote.author;

        //动画过渡到新高度
        quoteBox.style.height = newHeight + "px";

        sayingElement.classList.remove("fade-out");
        authorElement.classList.remove("fade-out");

        sayingElement.classList.add("fade-in");
        authorElement.classList.add("fade-in");

        setTimeout(() => {
            sayingElement.classList.remove("fade-in");
            authorElement.classList.remove("fade-in");

            //动画结束后，释放高度控制（回到auto）
            quoteBox.style.height = "auto";
        }, 500);
    }, 500);
}


renderRandomQuote(); //首次加载随机显示
document.getElementById("quote-container").addEventListener('click', renderRandomQuote);