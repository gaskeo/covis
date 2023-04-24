import {Link, useLocation, useRoutes} from "react-router-dom";
import styles from "../styles/menu.module.css";
import {useRef, useState} from "react";
import {useBlur} from "../../../shared/hooks/useBlur";

interface MenuLink {
    type: "link"
    label: string;
    to: string;
    linkType: "good" | "bad";
}

interface MenuHeader {
    type: "header";
    label: string;
}

const MenuItems: (MenuLink | MenuHeader)[] = [
    {
        type: "header",
        label: "Мир"
    },
    {
        type: "link",
        label: "Всего заболеваний",
        to: "cases",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Заболеваний сегодня",
        to: "casesToday",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Всего смертей",
        to: "deaths",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Смертей сегодня",
        to: "deathsToday",
        linkType: "bad"
    },

    {
        type: "link",
        label: "Вакцин сделано",
        to: "vac",
        linkType: "good"
    },
    {
        type: "link",
        label: "Полные вакцины",
        to: "vacFull",
        linkType: "good"
    },
    {
        type: "link",
        label: "Поиск по странам",
        to: "search",
        linkType: "bad"
    },

    {
        type: "header",
        label: "Россия"
    },
    {
        type: "link",
        label: "Заболеваний за месяц",
        to: "casesRu",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Смертей за месяц",
        to: "deathsRu",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Поиск по регионам",
        to: "searchRu",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Заболевания на карте",
        to: "casesMap",
        linkType: "bad"
    },
    {
        type: "link",
        label: "Смерти на карте",
        to: "deathsMap",
        linkType: "bad"
    },
]

interface MenuLinkProps {
    to: string;
    type: "good" | "bad"
    label: string
    active: boolean
    onClick?: () => void
}

const MenuLink = ({active, to, type, label, onClick}: MenuLinkProps) => {
    const goodOrBad = type === "good" ? styles.goodButton : styles.badButton;
    const activeOrNot = active ? "" : styles.notSelectedButton;
    return (
        <Link
            to={to}
            className={`${styles.menuItem} ${goodOrBad} ${activeOrNot}`}
            onClick={onClick}
        >
            {label}
        </Link>
    )
}

const Menu = () => {
    const location = useLocation();
    const href = location.pathname.replace("/", "");
    const [open, updateOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const activeTab = href ? href : 'cases';

    const isDesktop = window.innerWidth > 1023;
    const renderMenu = isDesktop || open;
    useBlur<HTMLDivElement>(menuRef, () => updateOpen(false));


    return (
        <>
            <div className={`${styles.blur} ${(isDesktop || !open) && styles.noBlur}`}/>

            <div ref={menuRef} className={styles.menuContainer}>
                <button className={`${styles.burgerMenuButton} ${open && styles.burgerMenuButtonOpen}`}
                        onClick={() => updateOpen(!open)}>
                    <span/>
                    <span>
                    <span/>
                    <span/>
                </span>
                    <span/>
                </button>
                {renderMenu &&
                    <div className={styles.menu}>
                        {MenuItems.map(item => {
                            if (item.type === "link") {
                                return (
                                    <MenuLink key={item.label} to={item.to} type={item.linkType} label={item.label}
                                              onClick={() => updateOpen(false)}
                                              active={activeTab === item.to}/>
                                )
                            }
                            return <h3 key={item.label}>{item.label}</h3>
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Menu;
