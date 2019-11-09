import React, {Component} from "react";


class Carousel extends Component {
    constructor(props) {
        super(props);
    }

    static previewClick(e, index) {
        const container = e.target.parentNode.parentNode.parentNode;
        const entry = container.children[0];

        entry.scroll(entry.children[index].offsetLeft - entry.children[0].offsetLeft, 0);
        for (let i = 0; i < entry.children.length; i++) {
            container.children[1].children[i].children[0].classList.remove("active");
        }
        container.children[1].children[index].children[0].classList.add("active");
    }

    static arrowClick(e, sign) {
        const container = e.target.parentNode.parentNode;
        const entry = container.children[0];
        let index = 0;
        for (let i = 0; i < entry.children.length; i++) {
            if (entry.scrollLeft <= entry.children[i].offsetLeft - entry.children[0].offsetLeft) {
                index = i;
                break
            }
        }

        if (sign === 'next') {
            index += 1;
        } else if (sign === 'back') {
            index -= 1;
        }

        if (index < 0) {
            index = entry.children.length - 1;
        } else if (index > entry.children.length - 1) {
            index = 0
        }

        entry.scroll(entry.children[index].offsetLeft - entry.children[0].offsetLeft, 0);

        for (let i = 0; i < entry.children.length; i++) {
            container.children[1].children[i].children[0].classList.remove("active");
        }
        container.children[1].children[index].children[0].classList.add("active");
    }

    render() {
        return (
            this.props.images.length ? <nav className='carousel'>
                <div className='container'>
                    <div className="entry">
                        {
                            this.props.images.map((image, index) => (
                                <img key={index} className="image" src={image.src} alt="image"/>
                            ))
                        }
                    </div>
                    <div className="preview">
                        {
                            this.props.images.map((image, index) => (
                                <div key={index} className="card">
                                    <img onClick={
                                        (e) => (Carousel.previewClick(e, index))
                                    } className={index === 0 ? "short-image active" : "short-image"} src={image.src}
                                         alt="image"/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="arrow-back" onClick={(e) => (Carousel.arrowClick(e, 'back'))}>
                        <img src="/static/img/back.svg" width="30px" height="30px" alt="back"/>
                    </div>
                    <div className="arrow-next" onClick={(e) => (Carousel.arrowClick(e, 'next'))}>
                        <img src="/static/img/next.svg" width="30px" height="30px" alt="next"/>
                    </div>
                </div>
            </nav> : null
        )
    }
}

export default Carousel;