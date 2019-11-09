import React, {Component} from "react";


class Header extends Component {
    constructor(props) {
        super(props);

        this.menu = [
            {
                'name': 'Игры',
                'href': '/games/',
                'pathname': '/games/'
            },
            {
                'name': 'Новости',
                'href': '/news/',
                'pathname': '/news/'
            },
            {
                'name': 'Файлы',
                'href': '/files/',
                'pathname': '/files/'
            },
            {
                'name': 'Прохождения',
                'href': '/playthrough/',
                'pathname': '/playthrough/'
            },
        ];
    }

    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="content">
                        <a className="logo" href={"/"}>
                            <span className="title">iGrodno</span>
                        </a>
                        <nav className="subs">
                            {
                                this.menu.map((obj, index) => (
                                    <a key={index}
                                       className={window.location.pathname === obj.pathname ? "active" : null}
                                       href={obj.href}>{obj.name}{
                                        window.location.pathname === obj.pathname ?
                                            <span className="under-line"></span> : null
                                    }</a>
                                ))
                            }
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;