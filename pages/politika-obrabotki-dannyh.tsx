import styles from '../styles/Contacts.module.scss';

import Breadcrumbs, { BreadcrumbType } from '../components/Layout/Breadcrumbs';
import StaticPagesMenu from '../components/StaticPages/Menu';

const breadcrumbs: BreadcrumbType[] = [
  {
    title: 'Политика обработки данных',
    href: '/politika-obrabotki-dannyh',
  },
];

export default function Delivery() {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className={`${styles.staticPage} container`}>
        <StaticPagesMenu />
        <div className={styles.staticPageContent}>
          <h1 className={styles.staticPageTitle}>Политика обработки данных</h1>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageText}>
              Настоящая Политика конфиденциальности (далее&nbsp;&mdash;{' '}
              <span className={`${styles.staticPageText} ${styles.bold}`}>
                Политика
              </span>
              ) определяет политику в&nbsp;отношении обработки персональных
              данных, содержит сведения о&nbsp;реализуемых Оператором
              требованиях к&nbsp;защите персональных данных.
            </div>
            <div className={styles.staticPageSubTitle}>
              1. Термины и определения
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.1
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Пользователь (Субъект персональных данных, Субъект)
                </span>
                &nbsp;&mdash; физическое лицо, использующее Сайт для получения
                информации об&nbsp;услугах, продуктах Оператора, представленных
                на&nbsp;Сайте, заключения договоров с&nbsp;Оператором или
                третьими лицами, либо взаимодействующее с&nbsp;Оператором
                по&nbsp;его контактным данным или третьими лицами.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.2
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Оператор
                </span>
                &nbsp;&mdash; Общество с&nbsp;ограниченной ответственностью
                &laquo;ВОБАЗА&raquo;, ОГРН: 1206100021863, ИНН: 6167198895,
                адрес: 344111, Ростовская область, г. Ростов-на-Дону, ул.
                50-летия октября, дом 33/1, офис 1. Реквизиты Оператора указаны
                в&nbsp;разделе&nbsp;11.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.3
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Cookies
                </span>
                &nbsp;&mdash; фрагмент данных в&nbsp;составе HTTP-запроса,
                предназначенный для хранения на&nbsp;устройстве Пользователя
                и&nbsp;применяемый Оператором для аутентификации пользователя,
                хранения персональных предпочтений и&nbsp;настроек пользователя,
                отслеживания состояния сеанса доступа пользователя, ведения
                статистики относительно Пользователей.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.4
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Cайт
                </span>
                &nbsp;&mdash; совокупность программ для электронных
                вычислительных машин и&nbsp;иной информации
                в&nbsp;информационно-телекоммуникационной сети
                &laquo;Интернет&raquo;, предназначенной для отображения
                в&nbsp;браузере и&nbsp;доступ к&nbsp;которому осуществляется
                с&nbsp;использованием доменного имени vobaza.ru, а&nbsp;также
                его поддоменов.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.5
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Обезличивание персональных данных
                </span>
                &nbsp;&mdash; действия, в&nbsp;результате которых становится
                невозможным без использования дополнительной информации
                определить принадлежность персональных данных конкретному
                субъекту персональных данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                1.6
              </div>
              <div className={styles.staticPageText}>
                <span className={`${styles.staticPageText} ${styles.bold}`}>
                  Обработка персональных данных
                </span>
                &nbsp;&mdash; любое действие (операция) или совокупность
                действий (операций), совершаемых с&nbsp;использованием средств
                автоматизации или без использования таких средств
                с&nbsp;персональными данными, включая сбор, запись,
                систематизацию, накопление, хранение, уточнение (обновление,
                изменение), извлечение, использование, передачу
                (распространение, предоставление, доступ), обезличивание,
                блокирование, удаление, уничтожение персональных данных.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>2. Общие положения</div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.1
              </div>
              <div className={styles.staticPageText}>
                Политика регулирует вопросы обработки персональных данных при
                осуществлении Оператором взаимодействия с&nbsp;Пользователем
                в&nbsp;связи с&nbsp;использованием Пользователем Сайта.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.2
              </div>
              <div className={styles.staticPageText}>
                Политика разработана в&nbsp;соответствии с&nbsp;требованиями:
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.2.1
              </div>
              <div className={styles.staticPageText}>
                Конституции Российской Федерации;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.2.2
              </div>
              <div className={styles.staticPageText}>
                Федерального закона Российской Федерации от&nbsp;27&nbsp;июля
                2006&nbsp;г. &#8470;&nbsp;152-ФЗ &laquo;О&nbsp;персональных
                данных&raquo;;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.2.3
              </div>
              <div className={styles.staticPageText}>
                Договоров, заключаемых Оператором;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.2.4
              </div>
              <div className={styles.staticPageText}>
                Другими нормативными документами с&nbsp;учетом действующих
                требований в&nbsp;области защиты персональных данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                2.3
              </div>
              <div className={styles.staticPageText}>
                Настоящая Политика опубликована на&nbsp;странице Сайта.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              3. Цели и&nbsp;основания обработки персональных данных
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1
              </div>
              <div className={styles.staticPageText}>
                Персональные данные Пользователей в&nbsp;части использования
                Сайта обрабатываются со&nbsp;следующими целями:
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1.1
              </div>
              <div className={styles.staticPageText}>
                Использование Пользователем Сайта;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1.2
              </div>
              <div className={styles.staticPageText}>
                Улучшение качества функционирования Сайта, удобства его
                использования, решение проблем Субъекта, связанных
                с&nbsp;функционированием Сайта;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1.3
              </div>
              <div className={styles.staticPageText}>
                В&nbsp;случае заказа услуг, приобретения товаров, заключения
                лицензионного договора в&nbsp;отношении продуктов,
                представленных на&nbsp;Сайте, в&nbsp;соответствии
                с&nbsp;Пользовательским соглашением&nbsp;&mdash; заключение
                договора с&nbsp;Пользователем и&nbsp;его исполнение, получение
                обратной связи в&nbsp;отношении исполнения договора
                от&nbsp;Субъекта;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1.4
              </div>
              <div className={styles.staticPageText}>
                Получение Пользователем информационной, рекламной
                и&nbsp;маркетинговой рассылки от&nbsp;Оператора, продвижения
                продуктов, товаров, работ, услуг Оператора на&nbsp;рынке путем
                осуществления прямых контактов с&nbsp;потенциальным потребителем
                с&nbsp;помощью средств связи;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.1.5
              </div>
              <div className={styles.staticPageText}>
                для других целей с&nbsp;согласия Пользователей.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.2
              </div>
              <div className={styles.staticPageText}>
                Персональные данные могут быть использованы с&nbsp;иными целями,
                если это является обязательным в&nbsp;соответствии
                с&nbsp;положениями законодательства Российской Федерации.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                3.3
              </div>
              <div className={styles.staticPageText}>
                Обработка персональных данных ограничивается достижением
                конкретных, заранее определенных и&nbsp;законных целей.
                Не&nbsp;допускается обработка персональных данных, несовместимая
                с&nbsp;целями сбора персональных данных.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              4. Состав информации о&nbsp;пользователях
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                4.1
              </div>
              <div className={styles.staticPageText}>
                Оператор обрабатывает следующие персональные данные
                Пользователей: фамилия, имя, отчество (при наличии), адрес
                электронной почты, номер телефона, наименование компании,
                IP-адрес, MAC-адрес, ID&nbsp;устройства, IMEI, MEID, данные
                из&nbsp;cookies, информация о&nbsp;браузере, операционной
                системе, времени доступа, иные данные, предоставленные
                Пользователем и&nbsp;необходимые для заключения
                и&nbsp;исполнения договора с&nbsp;Оператором, а&nbsp;также
                другие данные по&nbsp;согласованию с&nbsp;Пользователем
                и&nbsp;необходимые для решения вопросов Пользователя
                в&nbsp;зависимости от&nbsp;обстоятельств.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              5. ПРАВА ПОЛЬЗОВАТЕЛЯ
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                5.1
              </div>
              <div className={styles.staticPageText}>
                Пользователь имеет право:
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                5.1.1
              </div>
              <div className={styles.staticPageText}>
                Запрашивать у&nbsp;Оператора изменения, уточнения персональных
                данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                5.1.2
              </div>
              <div className={styles.staticPageText}>
                Требовать извещения всех лиц, которым ранее были сообщены
                неверные или неполные персональные данные.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                5.1.3
              </div>
              <div className={styles.staticPageText}>
                Получать от&nbsp;Оператора информацию, касающуюся обработки его
                персональных данных в&nbsp;пределах полномочий Оператора
                и&nbsp;в&nbsp;соответствии с&nbsp;порядком, принятым Оператором.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              6. Сведения о&nbsp;реализуемых требованиях к&nbsp;защите
              персональных данных
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1
              </div>
              <div className={styles.staticPageText}>
                При обработке персональных данных Оператор принимает необходимые
                правовые, организационные и&nbsp;технические меры
                и&nbsp;обеспечивает их&nbsp;принятие для защиты персональных
                данных от&nbsp;неправомерного или случайного доступа к&nbsp;ним,
                уничтожения, изменения, блокирования, копирования,
                предоставления, распространения персональных данных,
                а&nbsp;также от&nbsp;иных неправомерных действий
                в&nbsp;отношении персональных данных, которыми являются
                в&nbsp;частности (но&nbsp;не&nbsp;ограничиваясь):
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.1
              </div>
              <div className={styles.staticPageText}>
                Назначение ответственного лица за&nbsp;обработку персональных
                данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.2
              </div>
              <div className={styles.staticPageText}>
                Ограничение состава работников, имеющих доступ
                к&nbsp;персональным данным.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.3
              </div>
              <div className={styles.staticPageText}>
                Программная идентификация Пользователей и&nbsp;учет
                их&nbsp;действий.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.4
              </div>
              <div className={styles.staticPageText}>
                Осуществление антивирусного контроля и&nbsp;иных мер защиты
                от&nbsp;вредоносного программного воздействия.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.5
              </div>
              <div className={styles.staticPageText}>
                Применение средств резервного копирования и&nbsp;восстановления
                информации.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.6
              </div>
              <div className={styles.staticPageText}>
                Регулярное обновление программного обеспечения, используемого
                при обработке персональных данных, для обеспечения безопасности
                обрабатываемых данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.7
              </div>
              <div className={styles.staticPageText}>
                Осуществление шифрования при передаче персональных данных
                в&nbsp;сети Интернет.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.8
              </div>
              <div className={styles.staticPageText}>
                Принятие мер, связанных с&nbsp;допуском только надлежащих лиц
                в&nbsp;местах установки технических средств.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                6.1.8
              </div>
              <div className={styles.staticPageText}>
                Применение технических средств охраны помещений, в&nbsp;которых
                расположены технические средства информационных систем
                персональных данных, и&nbsp;мест хранения материальных носителей
                персональных данных.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              7. Конфиденциальность
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                7.1
              </div>
              <div className={styles.staticPageText}>
                Оператор и&nbsp;иные лица, получившие доступ к&nbsp;персональным
                данным, обязаны не&nbsp;раскрывать третьим лицам
                и&nbsp;не&nbsp;распространять персональные данные без согласия
                Пользователя, за&nbsp;исключением случаев, предусмотренных
                действующим законодательством.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              8. Уничтожение (обезличивание) персональных данных
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                8.1
              </div>
              <div className={styles.staticPageText}>
                Уничтожение (обезличивание) персональных данных Пользователя
                производится в&nbsp;следующих случаях:
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                8.1.1
              </div>
              <div className={styles.staticPageText}>
                По&nbsp;достижении целей их&nbsp;обработки или в&nbsp;случае
                утраты необходимости в&nbsp;их&nbsp;достижении в&nbsp;срок,
                не&nbsp;превышающий тридцати дней с&nbsp;момента достижения цели
                обработки персональных данных, если иное не&nbsp;предусмотрено
                договором, стороной по&nbsp;которому является Пользователь, иным
                соглашением между Оператором Пользователем (его представителем).
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                8.1.2
              </div>
              <div className={styles.staticPageText}>
                В&nbsp;случае выявления неправомерной обработки персональных
                данных или правомерного отзыва персональных данных в&nbsp;срок,
                не&nbsp;превышающий десяти рабочих дней с&nbsp;момента выявления
                такого случая;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                8.1.3
              </div>
              <div className={styles.staticPageText}>
                В&nbsp;случае истечения срока хранения персональных данных,
                определяемого в&nbsp;соответствии
                с&nbsp;законодательством&nbsp;РФ
                и&nbsp;организационно-распорядительными документами Оператора,
                включая отзыв согласия на&nbsp;обработку персональных данных
                Пользователя;
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                8.1.4
              </div>
              <div className={styles.staticPageText}>
                в&nbsp;случае предписания уполномоченного органа по&nbsp;защите
                прав субъектов персональных данных, Прокуратуры России или
                решения суда.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              9. Передача третьим лицам
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                9.1
              </div>
              <div className={styles.staticPageText}>
                Оператор не&nbsp;осуществляет трансграничную передачу
                персональных данных. При осуществлении хранения персональных
                данных Оператор использует базы данных, находящиеся
                на&nbsp;территории Российской Федерации.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                9.2
              </div>
              <div className={styles.staticPageText}>
                Оператор может передавать персональные данные только тем третьим
                лицам, которые указаны в&nbsp;Согласии субъекта
                на&nbsp;обработку персональных данных.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                9.3
              </div>
              <div className={styles.staticPageText}>
                Оператор вправе передавать персональные данные органам дознания
                и&nbsp;следствия, иным уполномоченным органам
                по&nbsp;основаниям, предусмотренным действующим
                законодательством Российской Федерации.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              10. Заключительные положения
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                10.1
              </div>
              <div className={styles.staticPageText}>
                Срок обработки персональных данных, обрабатываемых Оператором,
                равен сроку исполнения обязательств Оператора или до&nbsp;отзыва
                согласия Пользователем или прекращения деятельности Оператора.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                10.2
              </div>
              <div className={styles.staticPageText}>
                Отзыв согласия осуществляется путем направления Субъектом или
                его представителем письменного заявления Оператору,
                составленного в&nbsp;свободной форме, способом, позволяющим
                достоверно определить лицо, подписавшее и&nbsp;направившее
                заявление, а&nbsp;также основания полномочий представителя.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                10.3
              </div>
              <div className={styles.staticPageText}>
                Настоящая Политика подлежит изменению, дополнению в&nbsp;случае
                появления новых законодательных актов и&nbsp;специальных
                нормативных актов по&nbsp;обработке и&nbsp;защите персональных
                данных, а&nbsp;также по&nbsp;решению Оператора.
              </div>
            </div>
            <div>
              <div className={`${styles.staticPageText} ${styles.bold}`}>
                10.4
              </div>
              <div className={styles.staticPageText}>
                Вопросы, не&nbsp;урегулированные настоящей Политикой,
                регулируются действующим законодательством Российской Федерации.
              </div>
            </div>
          </div>
          <div className={styles.staticPageInfo}>
            <div className={styles.staticPageSubTitle}>
              11. Реквизиты оператора
            </div>
            <div className={styles.staticPageTable}>
              <div className={styles.staticPageTableRow}>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Полное наименование
                </div>
                <div
                  className={`${styles.staticPageTableCell} ${styles.staticPageTableCellTitle}`}
                >
                  Общество с&nbsp;ограниченной ответственностью
                  &laquo;ВОБАЗА&raquo;
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  Юридический (почтовый) адрес:
                </div>
                <div className={styles.staticPageTableCell}>
                  344111, Ростовская область, город Ростов-на-Дону, улица
                  50летия Октября, дом 33/1, офис&nbsp;1
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  ОГРН&nbsp;/ ИНН&nbsp;/ КПП
                </div>
                <div className={styles.staticPageTableCell}>
                  1206100021863&nbsp;/ 6167198895&nbsp;/ 616701001
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>Телефон</div>
                <div className={styles.staticPageTableCell}>
                  8 (495) 899-09-09
                </div>
              </div>
              <div className={styles.staticPageTableRow}>
                <div className={styles.staticPageTableCell}>
                  Адрес электронной почты
                </div>
                <div className={styles.staticPageTableCell}>info@vobaza.ru</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
