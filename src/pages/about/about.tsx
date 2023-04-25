import {Link} from "react-router-dom";
import styles from "./styles/about.module.css";

const AboutPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <section>
                <h2>О covis</h2>
                <p>
                    Сайт covis разработан в учебных целях.
                    Данные, которые размещаются на сайте, реальны, но могут быть некорректны или неактуальны.
                </p>
            </section>
            <section>
                <h2>Данные</h2>
                <p>
                    Сайт использует <Link to="https://milab.s3.yandex.net/2020/covid19-stat/data/v10">публичное API
                    яндекса</Link> для сбора данных.
                </p>
                <span>
                    Данное API больше не отдает актуальную информацию. Последняя дата обновления API: 27 января 2022 года.
                </span>
                <br/>
                <p>
                    Для визуализации данных используется библиотека <Link to="https://recharts.org/">Recharts</Link>.
                </p>

            </section>
            <section>
                <h2>Ссылки</h2>
                <p>
                    <Link to="https://github.com/gaskeo/covis" className={styles.socialLink}>
                        <img alt="Github" src="https://github.githubassets.com/images/modules/site/icons/footer/github-mark.svg"/>
                        gaskeo/covis
                    </Link>
                </p>
            </section>

        </div>
    )
}
export {AboutPage};
