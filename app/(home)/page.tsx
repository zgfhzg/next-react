const mainMenus = [
    {
        title: "Magna",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.",
        style: "style1",
        img: "images/pic01.jpg",
    },
    {
        title: "Lorem",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.",
        style: "style2",
        img: "images/pic02.jpg",
    },
    {
        title: "Feugiat",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.",
        style: "style3",
        img: "images/pic03.jpg",
    },
    {
        title: "Tempus",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.",
        style: "style4",
        img: "images/pic04.jpg",
    },
    {
        title: "Aliquam",
        summary: "Sed nisl arcu euismod sit amet nisi lorem etiam dolor veroeros et feugiat.",
        style: "style5",
        img: "images/pic05.jpg",
    }
]
export default function Home() {
    return (
        <div id="main">
            <div className="inner">
                <h1 id="homeTitle">Welcome! This is private page</h1>
                <section className="tiles">
                    {mainMenus.map((item) => (
                        <article className={item.style} key={item.title}>
                            <span className="image">
                                <img src={item.img} alt=""/>
                            </span>
                            <a href="/generic">
                                <h2>{item.title}</h2>
                                <div className="content">
                                    <p>{item.summary}</p>
                                </div>
                            </a>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    );
}
