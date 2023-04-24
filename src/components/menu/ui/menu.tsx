import {Link, useLocation, useRoutes} from "react-router-dom";
import styles from "../styles/menu.module.css";
import {useState} from "react";

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

]

interface MenuLinkProps {
    to: string;
    type: "good" | "bad"
    label: string
    active: boolean
}

const MenuLink = ({active, to, type, label}: MenuLinkProps) => {
    const goodOrBad = type === "good" ? styles.GoodButton : styles.BadButton;
    const activeOrNot = active ? "" : styles.NotSelectedButton;
    return <Link to={to} className={`${styles.MenuButton} ${goodOrBad} ${activeOrNot}`}>{label}</Link>
}

const Menu = () => {
    const location = useLocation();
    const href = location.pathname.replace("/", "");

    const activeTab = href ? href : 'cases';

    return (
        <div className={styles.menu}>
            {MenuItems.map(item => {
                if (item.type === "link") {
                    return (
                        <MenuLink key={item.label} to={item.to} type={item.linkType} label={item.label} active={activeTab === item.to}/>
                    )
                }
                return <h3 key={item.label}>{item.label}</h3>
            })}
        </div>
    )
}

export {Menu}