import { StaticImageData } from 'next/image';
import cover1 from './img/temp1.jpg';
import cover2 from './img/temp2.jpg';
import cover3 from './img/temp3.jpg';
import cover4 from './img/temp4.jpg';
import cover5 from './img/temp5.jpg';
import cover6 from './img/temp6.jpg';

export interface IBlogPost {
  id: number;
  slug: string;
  cover: StaticImageData;
  created_at: string;
  title: string;
  htmlContent: string;
}

const blogPosts: IBlogPost[] = [
  {
    id: 1,
    slug: 'dvuhyarusnaya-krovat-dlya-detey-za-i-protiv',
    cover: cover1,
    created_at: '24 Ноя 2021',
    title: 'Двухъярусная кровать для детей: за и против',
    htmlContent: `<div><p>Двухъярусная кровать – красивая и комфортная модель для детской. Дети просто обожают такие кровати! Это не только место для сна, но и пространство для игр. Высокий домик можно превратить в сказочный дворец или уютный шатер, украсив его текстилем и фонариками, дополнив балдахином и прочими аксессуарами. Ну кто в детстве не мечтал об этом?</p>
  <p>Но, как и в любом интерьерном решении, существуют "за" и "против".
    </p>
  <p>Мы решили разобраться, какие достоинства и недостатки кроются за покупкой двухъярусной кровати.
    </p>
  <p>&nbsp;
    </p>
  <p><b><span style="color:rgb(95,73,122);">Достоинства</span></b><span></span>
    </p>
  <p>Двухэтажная кровать – эргономичная, она освобождает много свободного места в комнате. Это основное преимущество двухъярусной кровати. Когда в комнате живет два (и более) ребенка, важен каждый сантиметр свободной площади.<br></p>
  <p><img src="https://vobaza.ru/images/blog/2/astra2.jpg?1621942494826" alt="astra2.jpg?1621942494826" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/krovat-dvuhyarusnaya-astra-2-dub-molochnyy-fioletovyy.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Кровать двухъярусная Астра 2</em></span></a><br></p>
  <p><br></p>
  <p>Всем известно, что качественный сон – это залог здоровья, хорошего настроения и продуктивности. А в период роста малыша еще и крайне важно предусмотреть ортопедическое спальное место для правильного положения позвоночника во время сна. Кресло-кровать или детский диван безусловно проигрывают в этом плане кровати с анатомическим матрасом.<br></p>
  <p><br></p>
  <p>Большое разнообразие моделей позволяет выбрать кровать, оборудованную спортивной системой, письменным столом, диваном для отдыха на нижнем ярусе и т. п. Все зависит от предпочтений и потребностей.<br></p>
  <p><img src="https://vobaza.ru/images/blog/2/cherdak_so%20stolom.jpg?1621941857814" alt="cherdak_so%20stolom.jpg?1621941857814" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/krovat-cherdak-jimmy-royal-beta-belyy-rozovyy-160x80.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Кровать-чердак Jimmy Royal Beta</em></span></a></p>
  <p><br></p>
  <p>Для большей функциональности двухъярусные кровати дополняют выдвижными ящиками для игрушек и постельного белья. Можно даже выбрать модель со встроенным платяным шкафом.<br></p>
  <p><img src="https://vobaza.ru/images/blog/2/leo_parij.jpg?1621942160403" alt="leo_parij.jpg?1621942160403" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/krovat-dvuhyarusnaya-leo-dub-molochnyy-polnostyu-parizh.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Кровать двухъярусная Лео</em></span></a></p>
  <p><br></p>
  <p>Широкий выбор цветовой палитры фасадов сделает детскую ярким, притягательным местом для отдыха и игр. Замечательный вариант для детей, который не оставит равнодушными и взрослых людей!<br></p>
  <p>&nbsp;
    </p>
  <p><b><span style="color:rgb(95,73,122);">Недостатки</span></b>
    </p>
  <p>Одно из основных переживаний родителей при покупке двухъярусной кровати – это безопасность ребенка. Поэтому специалисты не рекомендуют размещать на втором ярусе детей младше пяти лет. Производители двухэтажных кроватей предусматривают высокие бортики, чтобы ребенок не мог упасть во сне. При выборе кровати обратите внимание, чтобы бортики были не менее 30 см.<br></p>
  <p>Обладатели таких кроватей отмечают, что неудобно перестилать постель на втором ярусе.<br></p>
  <p>Во время отопительного сезона на втором ярусе может быть душно. Но проблема решается проветриванием комнаты перед сном.<br></p>
  <p>Если в комнате невысокие потолки, есть риск, что ребенок будет упираться в потолок лбом при подъеме с матраса. Поэтому при покупке обязательно учитывайте высоту и кровати, и потолков. Расстояние между ярусами должно быть оптимальным и позволять взрослому удобно сидеть на первом этаже, не сгибаясь при этом.<br></p>
  <p>&nbsp;<br></p>
  <p><b><span style="color:rgb(95,73,122);">На что нужно обратить внимание при выборе двухъярусной кровати</span></b>
    </p>
  <p>Конфигурация кроватей может быть не только двухъярусной, но и трехъярусной, а также существуют кровати-чердаки и кровати-ступеньки.<br></p>
  <p><img src="https://vobaza.ru/images/blog/2/Golden%20Kids.jpg?1621943152919" alt="Golden%20Kids.jpg?1621943152919" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/trehyarusnaya-krovat-golden-kids-belyy.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Трехъярусная кровать Golden Kids</em></span></a></p>
  <p><br></p>
  <p>Чердаки – это кровати, где наверху расположено спальное место, а внизу оборудована определенная зона. Например, игровая площадка для малыша.</p>
  <p>Или письменный стол, чтобы удобно было делать уроки и хранить книжки и тетрадки. Есть варианты, где сверху находится кровать, а внизу – раскладной диван, на котором удобно будет посидеть или разместить гостя на ночевку.
    </p>
  <p><img src="https://vobaza.ru/images/blog/2/astra10.jpg?1621943624439" alt="astra10.jpg?1621943624439" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/krovat-cherdak-astra-10-dub-molochnyy-oreh.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Кровать-чердак Астра 10</em></span></a><br></p>
  <p><br></p>
  <p>Если высокие модели – это не ваш вариант, рассмотрите кровати-ступеньки с выкатным элементом. Особенно удобно это для маленьких детей, если вы переживаете за их безопасность.<br></p>
  <p><img src="https://vobaza.ru/images/blog/2/Golden%20Kids%208.jpg?1621944432533" alt="Golden%20Kids%208.jpg?1621944432533" class="blazy-img-tabs"><br></p>
  <p><a href="https://vobaza.ru/dvuhyarusnaya-krovat-golden-kids-8-venge-rozovyy.html" target="_blank"><span style="color:rgb(191,191,191);"><em>Двухъярусная кровать Golden Kids 8</em></span></a><br></p>
  <p><br></p>
  <p>Есть даже такие модели двухъярусных кроватей, где нижний ярус имеет ширину спального места 140 см, а верхний 80-90 см. Такой вариант будет удобен там, где взрослые живут в одной комнате с ребенком и принципиален каждый свободный сантиметр.</p>
  <p>Двухъярусная кровать должна быть в первую очередь безопасной. А это значит, она изготавливается из хорошего материала и на совесть. Она не должна качаться и вибрировать. Это основное.<br></p>
  <p>Как и с любой другой детской мебелью, принципиально отсутствие острых и выступающих углов.<br></p>
  <p>Лестница должна быть устойчивой, под небольшим наклоном, чтобы ребенку было удобнее взбираться наверх.<br></p>
  <p>&nbsp;
    </p>
  <p><strong><span style="color:rgb(95,73,122);">Вывод&nbsp;</span></strong> &nbsp;&nbsp;</p>
  <p>Для семей, где два, три и более детей, многоярусные кровати станут настоящей палочкой-выручалочкой, позволяя экономить пространство и оборудовать удобное спальное место для каждого ребенка.
    </p>
  <p>Детские кровати со вторым ярусом оставляют большой простор для выбора и творческого оформления детской. Этот предмет мебели функционален и эргономичен, имеет множество преимуществ.
  </p></div>`,
  },
  {
    id: 2,
    slug: 'kak-vibirat-matras',
    cover: cover2,
    created_at: '23 Ноя 2021',
    title: 'Вы точно недооцениваете роль матраса в вопросе сна',
    htmlContent: `<div><p><strong><img src="https://vobaza.ru/images/blog/2/matras%20800x360.jpg?1608884795210" alt="matras%20800x360.jpg?1608884795210" class="blazy-img-tabs"><br></strong></p>
    <p><strong>На каком удобнее спать? А что полезнее для спины?&nbsp;</strong></p>
    <p>Даём советы по выбору комфортного матраса.</p>
    <p>Правильно подобранный матрас обеспечит качественный сон. А значит, вы будете высыпаться, чувствовать себя бодро, вас не будут беспокоить боли в спине и отечность.</p>
    <p><strong>Матрасы высокой жёсткости подойдут:</strong></p>
    <ul><li>Детям и подросткам, которые находятся в периоде активного роста.</li><li>Людям, имеющим повышенную массу тела. Чем выше вес, тем жёстче должен быть матрас.</li></ul><p><strong>Матрасы средней и малой жёсткости рекомендуются:</strong></p>
    <ul><li>Пожилым людям. Вопреки распространённому мнению о том, что спать нужно на жёстком. Мягкая поверхность матраса поможет расслабить мышцы, снять нагрузку с суставов и сосудов.</li><li>Людям с весом до 55 кг лучше сделать выбор в пользу мягких моделей без кокосовой койры.</li><li>Люди среднего возраста с нормальным весом и не имеющие проблем с позвоночником могут выбрать модель матраса, исходя из своих предпочтений.</li></ul><p>Если вы периодически испытываете боль в спине, необходимо проконсультироваться с врачом. В зависимости от проблемы вам может быть рекомендован как очень жёсткий, так и мягкий матрас.</p>
    <p>Правильно подобранный матрас равномерно распределяет нагрузку, поддерживает тело во время сна, позволяя вам спать в анатомически правильном положении.</p>
    <p>Наполнение матраса напрямую влияет на его характеристики.</p>
    <p>Матрас может быть беспружинным, а также с пружинным основанием.</p>
    <p><strong>Пружинные блоки бывают двух видов:</strong></p>
    <ul><li>Блок боннель – единое полотно сплетенных между собой пружин с одинаковой жесткостью.</li><li>Независимый пружинный блок – отдельно расположенные пружины, которые могут иметь разную жесткость. Независимый пружинный блок оптимально распределяет нагрузку.</li></ul><p>Пружинный блок – это основа матраса. Помимо выбора пружинного блока и количества пружин, стоит обратить внимание на дополнительное наполнение.</p>
    <p>Самые популярные:</p>
    <ul><li>Кокосовая койра. Натуральный волокнистый материал, обволакивающий кокос. Служит для обеспечения жесткости, упругости и долговечности.</li><li>Латекс. Натуральный материал, получаемый из сока каучукового дерева. Позволяет обеспечить мягкую и деликатную поддержку позвоночника. Латекс реагирует на нагрузку исключительно в местах давления, делая матрас максимально ортопедическим.</li><li>Пенополиуретан. Обладает высокими анатомическими особенностями, заменяет латекс в бюджетных моделях матрасов.</li><li>Войлок. Позволяет продлить срок жизни матраса, служит прослойкой между пружинами и наполнителем матраса. Обладает умеренной жесткостью и делает матрас наиболее анатомическим. Положительно влияет на терморегуляцию во время сна.</li><li>Шерсть. Наличие её прослойки указывает на высокое качество матраса. Способствует хорошей терморегуляции: в холодное время года спать будет тепло, а в жару – прохладно. Кроме того, шерсть поглощает неприятные запахи.</li></ul></div>`,
  },
  {
    id: 3,
    slug: 'luchshie-mehanizmy-divana-dlya-sna',
    cover: cover3,
    created_at: '18 Ноя 2021',
    title: '​Лучшие механизмы диванов для сна',
    htmlContent: `<div><p>Выбор дивана – ответственная задача. Большинство из нас выбирают диван так, чтобы его еще можно было использовать как место для ежедневного сна.<br></p>
    <p>Один из важных вопросов, который предстоит решить перед покупкой, – это выбор механизма раскладки дивана. От верно выбранного механизма трансформации зависит то, насколько удобно будет ежедневно раскладывать и складывать диван, удобно ли будет спать, сколько места будет занимать диван в разложенном виде, будет ли там место для хранения постельных принадлежностей.
      </p>
    <p>На сегодняшний день на рынке представлено более 10 видов механизмов трансформации дивана.</p>
    <p>Мы выбрали наиболее популярные и удобные и решили рассказать вам об их плюсах и минусах.
      </p>
    <p><br></p>
    <p><b><span style="color:rgb(95,73,122);">«Еврокнижка</span></b><b><span style="color:rgb(95,73,122);">»</span> <span></span></b>
      </p>
    <p><img src="https://vobaza.ru/images/mehanizmi/evro.gif?1613464134800" style="width:317px;height:253px;" width="317" height="253" alt="evro.gif?1613464134800" class="blazy-img-tabs"><b></b></p>
    <p>Механизм трансформации «еврокнижка» образует широкую спальную поверхность. Он пользуется большой популярностью, потому что сам механизм не требует особых усилий при раскладывании. Выдвиньте за ремешок дополнительную поверхность, потяните ее вверх, пока она не зафиксируется на одном уровне с сиденьем. Потяните сиденье вперед и опустите на его место спинку.</p>
    <p><b><i>Плюсы:</i></b>
      </p>
    <ul><li>Диваны-еврокнижки удобны в эксплуатации, надежны и долговечны.
      </li><li>Такой диван без труда трансформируется в широкое, ровное спальное место.
      </li><li>Диваны оснащены просторным бельевым ящиком для хранения постельного белья и прочих вещей.
      </li><li>Механизм раскладывания максимально прост: нижняя часть выдвигается, а спинка дивана опускается на каркас. С этим справится даже ребёнок или пожилой человек.</li></ul><p><b><i>Минусы:</i></b>⠀
      </p>
    <ul><li>Из недостатков "еврокнижки" можно выделить наличие стыков между половинками дивана. Эта проблема легко решается приобретением наматрасника, который превращает диван в полноценную двуспальную кровать.
      </li><li>Если у дивана отсутствует фальш-спинка, то в процессе раскладывания диван нужно немного отодвинуть от стены, чтобы была возможность опустить спинку. 
      </li></ul><p>&nbsp;</p>
    <p><b><span style="color:rgb(95,73,122);">«Тик-так</span></b><b><span style="color:rgb(95,73,122);">»</span><span style="color:rgb(95,73,122);"> (Пантограф)</span></b></p>
    <p><img src="https://vobaza.ru/images/mehanizmi/tiktak.gif?1613464039354" style="width:336px;height:269px;" width="336" height="269" alt="tiktak.gif?1613464039354" class="blazy-img-tabs"><b></b></p>
    <p>Вместительный ящик для постельных принадлежностей позволит сэкономить пространство в вашей квартире. Механизм «тик-так» с улучшенной кинематикой обеспечивает легкость раскладки и бережет напольное покрытие. «Тик-так» – это усовершенствованная версия механизма “еврокнижка”.</p>
    <p><b><em>Плюсы:</em></b></p>
    <ul><li>Не повреждает напольное покрытие при раскладывании. Этот вариант подойдет тем, кто переживает за сохранность пола.
      </li><li>Раскладывать “тик-так” ещё проще, чем “еврокнижку”. Достаточно приподнять сиденье и слегка потянуть на себя. Механизм сам “шагнет” в разложенное состояние.
      </li><li>Как и механизм “еврокнижка”, диван с механизмом “тик-так” образует широкое, ровное спальное место.
      </li><li>Диван оснащен вместительным ящиком для хранения.</li></ul><p><b><em>Минусы:</em></b></p>
    <ul><li>Со временем механизм изнашивается и может выйти из строя быстрее, чем “еврокнижка”. Проблемы можно избежать, периодически смазывая пружины.
      </li></ul><p>&nbsp;
      </p>
    <p><b><span style="color:rgb(95,73,122);">«Аккордеон</span></b><b><span style="color:rgb(95,73,122);">»</span></b></p>
    <p><b></b>Механизм «аккордеон» образует широкое, бесшовное спальное место, сон и отдых становятся полноценными. Чтобы превратить диван в просторное место для сна вам не понадобится много усилий: потяните за скрытый ремешок, после чего сиденье поедет вперед, а двойная спинка в развернутом состоянии окажется на одном уровне с ним.</p>
    <p><b><em><img src="https://vobaza.ru/images/mehanizmi/akkordeon.gif?1613463997311" width="353" height="282" style="height:282px;font-family:'Trebuchet MS', 'Helvetica Neue', Helvetica, Tahoma, sans-serif;font-size:16px;background-color:rgb(255,255,255);width:353px;" alt="akkordeon.gif?1613463997311" class="blazy-img-tabs"><br></em></b></p>
    <p><b><em>Плюсы:</em></b></p>
    <ul><li>Удобно и без особенных усилий раскладывается в спальное место.
      </li><li>Диван-аккордеон не нужно отодвигать от стены, чтобы его разложить.
      </li><li>Большинство “аккордеонов” имеет красивое изголовье, как у дорогих кроватей.
      </li><li>У спального места нет стыков. Конструкция диванов с механизмом “аккордеон” предполагает сплошное ровное спальное место.
      </li><li>Большое спальное место. В зависимости от габаритов дивана, спальное место может быть в ширину до 180 см. Однако наиболее популярный размер спального места – 160*200 см (ш*д).
      </li><li>Компактность. В сложенном виде диван не занимает много места.</li></ul><p><b><em>Минусы:</em></b></p>
    <ul><li>Чтобы сложить диван, требуется приложить усилия. Ребенку или пожилому человеку может потребоваться помощь со складыванием дивана.
      </li><li>В диване с механизмом “аккордеон” чаще всего отсутствует бельевой ящик. А в моделях, где он есть, ящик небольшой.
      </li><li>В разложенном виде диван занимает много места. При планировании пространства учитывайте этот момент.</li></ul><p><b><br></b></p>
    <p><b><span style="color:rgb(95,73,122);">«Дельфин</span></b><b><span style="color:rgb(95,73,122);">»</span></b></p>
    <p><img src="https://vobaza.ru/images/mehanizmi/delfin.gif?1613464113321" style="width:318px;height:254px;" width="318" height="254" alt="delfin.gif?1613464113321" class="blazy-img-tabs"><b></b></p>
    <p>«Дельфин» – идеальный вариант для ежедневного использования. Благодаря усовершенствованному механизму после трансформации диван преобразуется в место для отдыха без петель между стыками. Выдвиньте за ремешок дополнительную поверхность, потяните ее вверх, пока она не зафиксируется на одном уровне с сиденьем. Механизм «дельфин» чаще всего используется в угловых диванах.</p>
    <p><b><em>Плюсы:</em></b></p>
    <ul><li>Надежность и долговечность механизма раскладывания. Механизм “дельфин” хорошо себя зарекомендовал для ежедневного использования.
      </li><li>Легко складывать и раскладывать диван.
      </li><li>Образуется большое, ровное спальное место.
      </li><li>Диван не занимает много места в разложенном виде.
      </li><li>Угловые модели оснащены просторным бельевым ящиком.</li></ul><p><b><em>Минусы:</em></b></p>
    <ul><li>В прямых моделях отсутствует бельевой ящик.
      </li><li>Из-за постоянного раскладывания дивана на полу могут образоваться царапины и борозды.
      </li><li>Если перестараться и сильно дернуть механизм при раскладывании дивана, он может “соскочить” с рельс. Ремонт такого “недоразумения” несложный, однако это может испортить вам настроение.</li></ul><p></p>
    <p>Выбирая себе диван и его механизм трансформации, учитывайте то, кто будет им пользоваться, как часто диван будет раскладываться, сколько места необходимо для сна и принципиально ли наличие бельевого ящика.
      </p>
    <p>Ответив на эти важные вопросы, вы без труда подберете себе идеальный диван.
      </p>
    <p>&nbsp;
    </p></div>`,
  },
  {
    id: 4,
    slug: 'kultovye-predmety-mebeli-na-kotorye-stoit-obratit-vnimanie',
    cover: cover4,
    created_at: '17 Ноя 2021',
    title: 'Культовые предметы мебели, на которые стоит обратить внимание',
    htmlContent: `<div><p>Знакомые всем предметы мебели и интерьера имеют свою историю и именитых создателей. В обычной жизни мы смотрим на мебель и даже не задумываемся об истории ее возникновения.</p>
    <p>Мы собрали 10 культовых предметов интерьера и выяснили, кто и при каких обстоятельствах их придумал.
    </p>
    <p><em style="color:rgb(95,73,122);"><strong><br></strong></em></p>
    <p><em style="color:rgb(95,73,122);"><strong>Кресло Sacco</strong></em><br></p>
    <p><b><em><span style="color:rgb(95,73,122);"></span></em></b>
      </p>
    <p>Кресло Sacco, что переводится с итальянского как «мешок», было придумано в 1968 году тремя дизайнерами: Франко Теодоро, Чезаре Паолини и Пьеро Гатти.
      В основе идеи лежало создание необычного предмета мебели. Дизайнеры задумали кресло в виде огромного мешка из прозрачной пленки, наполненного жидкостью. Неудивительно, что никто из мебельщиков не хотел браться за такой проект. До тех пор, пока Аурелио Занотта из одноименной мебельной компании Zonotta не согласился воплотить эту идею в жизнь. Пленку ПВХ заменили на плотную ткань, а наполнителем стали шарики из вспененного пластика. Кресло-мешок произвело фурор на мебельном рынке и по сей день пользуется большой популярностью.</p>
    <p><br><img src="https://vobaza.ru/images/blog/2/%D0%9A%D1%80%D0%B5%D1%81%D0%BB%D0%BE%20Sacco.jpg?1610966338083" alt="%D0%9A%D1%80%D0%B5%D1%81%D0%BB%D0%BE%20S" class="blazy-img-tabs"></p>
    <p><br></p>
    <p><b><span style="color:rgb(95,73,122);"><em>Стул</em></span></b><b><span style="color:rgb(95,73,122);"><em>&nbsp;Eames Plastic Side Chair DSW</em></span></b><br></p>
    <p>Идея революционной модели стула принадлежит супругам Чарльзу и Рэй Имз. Им удалось создать стул с идеальной посадкой, которая повторяет контуры тела и высокоэргономична. Отличительной особенностью стула стали пластиковый корпус и деревянные ножки с металлическими перекрестными креплениями. Стулья получились удобными, а дизайн произвел настоящую революцию и принес создателям коммерческий успех. В производство стул был запущен в 1950 году компанией Herman Miller. Дизайн стула оказался настолько удачным, что быстро пошел в массы, а аналоги сейчас выпускают различные мебельные производства.</p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%A1%D1%82%D1%83%D0%BB%20Eames%20Plastic%20Side%20Chair%20DSW.jpg?1610966356633" alt="%D0%A1%D1%82%D1%83%D0%BB%20Eames%20Plast" class="blazy-img-tabs"></p>
    <p><strong><em><span style="color:rgb(95,73,122);">Кресло «Василий»</span></em></strong><br></p>
    <p>Кресло из металлических трубок и тканевого или кожаного основания носит название «Василий». Однако создателя кресла зовут не Василием, как можно было бы подумать. Изобретателем стула является дизайнер венгерского происхождения Марсель Брейер. Конструкцию кресла Брейеру навеял велосипед, на котором он ездил на работу. А само название дано в честь Василия Кандинского, коллеги Брейера. Годом создания кресла считается 1925 г.</p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%9A%D1%80%D0%B5%D1%81%D0%BB%D0%BE%20%C2%AB%D0%92%D0%B0%D1%81%D0%B8%D0%BB%D0%B8%D0%B9%C2%BB.jpg?1610966373904" alt="%D0%9A%D1%80%D0%B5%D1%81%D0%BB%D0%BE%20%" class="blazy-img-tabs"><br></p>
    <p><span></span></p>
    <p><b><i><span style="color:rgb(95,73,122);">Табурет ARTEK (стул 60)</span></i></b><br></p>
    <p><span style="font-size:32px;"><b><i></i></b></span>Дизайн самой популярной табуретки в мире принадлежит дизайнеру Алвару Аалто родом из Финляндии. Дизайнер создал этот табурет для лекционного зала городской библиотеки.</p>
    <p>Инновацией в мебельном производстве стали изогнутые Г-образные ножки стула, выполненные из гнутой березовой фанеры. Ведь сломать и расшатать такую конструкцию намного сложнее, чем обычную прямую ножку. Удобство табуретов «Артек» состоит еще и в том, что они легки в сборке и без проблем штабелируются. Компания Artek до сих пор выпускает легендарные табуретки.
      Простота, удобство и эргономичность делает их популярными во всем мире.</p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%A2%D0%B0%D0%B1%D1%83%D1%80%D0%B5%D1%82%20ARTEK%20(%D1%81%D1%82%D1%83%D0%BB%2060).jpg?1610966386420" alt="%D0%A2%D0%B0%D0%B1%D1%83%D1%80%D0%B5%D1%" class="blazy-img-tabs"><br></p>
    <p><br></p>
    <p><strong><em><span style="color:rgb(95,73,122);">Венский стул Thonet №14</span></em></strong><br></p>
    <p><i style="font-size:32px;font-weight:700;"></i>Культовый венский стул Thonet № 14 изобрел мебельщик Михаэль Тонет в 1859 году. Модель этого стула сохраняет популярность уже более 150 лет. Кстати, фабрика «Тонет» существует и сегодня, продолжая производить различную мебель.</p>
    <p>Популярность и любовь покупателей стул завоевал благодаря своей крепости и лаконичному дизайну. По легенде, тонетовский стул был сброшен с Эйфелевой башни и пережил падение, не развалившись.
      </p>
    <p>В наше время венский стул имеет множество интерпретаций. Но объединяют их по-прежнему качество, надежность и изящество исполнения.
    </p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%92%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9%20%D1%81%D1%82%D1%83%D0%BB%20Thonet%20%E2%84%9614.jpg?1610966413180" alt="%D0%92%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%" class="blazy-img-tabs"></p>
    <p><span style="font-weight:700;"><strong><em><span style="color:rgb(95,73,122);">Люстра PH ARTICHOKE</span></em></strong></span><br></p>
    <p>Дизайн необычного светильника разработал датский дизайнер Пол Хеннингсен в 1958 году. Уже больше 60 лет люстра пользуется популярностью благодаря необычной конструкции и мягкому рассеянному свету, который она дает. Конструкция люстры состоит из 12 металлических обручей, к которым в определенном порядке прикреплено ровно 72 лепестка. Форма светильника приобрела большую популярность, она активно копируется и интерпретируется производителями световых приборов.<span></span>
    </p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%9B%D1%8E%D1%81%D1%82%D1%80%D0%B0%20PH%20ARTICHOKE.jpg?1610966434654" alt="%D0%9B%D1%8E%D1%81%D1%82%D1%80%D0%B0%20P" class="blazy-img-tabs"><br></p>
    <p><br></p>
    <p><strong><em><span style="color:rgb(95,73,122);">Настольная лампа ANGLEPOISE</span></em></strong><br></p>
    <p>Идея создания механизма лампы на шарнирах принадлежит британскому инженеру Джорджу Карвардайну. Удобство лампы в том, что шарнир фиксируется в любом положении с помощью пружин. Лампа была придумала и использовалась в мастерских, и лишь спустя несколько лет ее адаптировали для жилых помещений. 
      Культовой лампе даже посвятила песню английская группа Soft Boys - (I Wanna Be An) Anglepoise Lamp. Какой еще предмет обстановки может этим похвастаться?</p>
    <p><span style="color:rgb(95,73,122);"><img src="https://vobaza.ru/images/blog/2/%D0%9D%D0%B0%D1%81%D1%82%D0%BE%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F%20%D0%BB%D0%B0%D0%BC%D0%BF%D0%B0%20ANGLEPOISE.jpg?1610966469448" alt="%D0%9D%D0%B0%D1%81%D1%82%D0%BE%D0%BB%D1%" class="blazy-img-tabs"><br></span></p>
    <p><span style="font-weight:700;"><strong><em><span style="color:rgb(95,73,122);">Диван LC2</span></em></strong></span><br></p>
    <p>Спроектировал серию диванов и кресел LC2 французский архитектор швейцарского происхождения Ле Корбюзье в 1928 году. Диван LC2 — это настоящая легенда, модель, которая вошла в историю дизайна. Творение Корбюзье размещено в коллекции Музея Современного Искусства. Диван представляет собой каркас из стальных хромированных труб, а сверху размещены подушки.
      </p>
    <p>В наше время модели клубного дивана и кресла не теряют своей актуальности. Мебель выпускается как в классических цветах, так и в ярких, нестандартных расцветках.
    </p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20LC2.jpg?1610967151005" alt="%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20LC2.jpg" class="blazy-img-tabs"></p>
    <p><span style="color:rgb(95,73,122);"><strong><em>Диван Chesterfield</em></strong></span><br></p>
    <p>Дизайн дивана «Честерфилд» узнаваем и украшает классические и современные интерьеры. Однако дата его создания и авторство доподлинно не известны. Одни говорят о том, что диван впервые был изготовлен по заказу Филипа Стэнхоула, 4-ого графа Честерфилда. Другие, что диван назван в честь города Честерфилд, в котором он был создан. А третьи, что диван создал мебельщик по имени Честер.
      Современный диван «Честерфилд» не теряет своей актуальности. Выполняется как в классической кожаной обивке, так и в самых необычных вариантах.</p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20Chesterfield.jpg?1610966518665" alt="%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20Chester" class="blazy-img-tabs"><br></p>
    <p><em><strong><span style="color:rgb(95,73,122);">Диван TOGO</span></strong></em><br></p>
    <p>Диван Togo был создан в 70-е годы дизайнером Мишелем Дюкаруа. В то время бескаркасная мебель приобретала большую популярность. Диван Togo не стал исключением. Сам автор ассоциировал свой диван с металлическим тюбиком зубной пасты, запаянным с двух сторон.</p>
    <p>Выпуск дивана сопровождался рекламным лозунгом “Создано для души, для глаз, для тела”. А в 1973 году Togo был удостоен премии за инновационность.
      </p>
    <p>Бескаркасные сиденья дивана выполнены из вспененного полиуретана и покрыты складчатой обивкой. Он состоит из модулей, которые возможно составлять в любые композиции. Сегодня такой диван можно купить в самых разных расцветках.</p>
    <p><img src="https://vobaza.ru/images/blog/2/%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20TOGO.jpg?1610967257456" alt="%D0%94%D0%B8%D0%B2%D0%B0%D0%BD%20TOGO.jp" class="blazy-img-tabs"><br></p>
    <p><b><i><span style="color:rgb(95,73,122);"></span></i></b><br></p>
    <p><br></p>
    <p><br></p>
    <p><br></p></div>`,
  },
  {
    id: 5,
    slug: 'vibiraete-divan',
    cover: cover5,
    created_at: '15 Ноя 2021',
    title: 'Выбираете диван? Рассказываем, на что обратить внимание',
    htmlContent: `<div><p><img src="https://vobaza.ru/images/blog/2/divan%20800x360.jpg?1608885079012" alt="divan%20800x360.jpg?1608885079012" class="blazy-img-tabs"><br></p>
    <p>Выбор дивана – ответственная задача.
    Диван нужно выбирать не просто хороший, а подходящий именно вам.</p>
    <p>Перед покупкой обратите внимание на его назначение, конфигурацию, механизм трансформации, материал каркаса и обивки, количество посадочных и спальных мест, узнайте, оснащён ли диван пружинным блоком, какой жёсткости, есть ли в нем бельевой ящик.</p>
    <p><strong><em><span style="color:rgb(95,73,122);">Определяем габариты дивана</span></em></strong></p>
    <p>Просчитайте пространство, которое будет занимать диван. Если вам сложно представить его габариты перед покупкой, воспользуйтесь таким лайфхаком.</p>
    <p>Разложите на полу листы А4 в соответствии с габаритами дивана. Это поможет понять, сколько места займет новая мебель.</p>
    <p>Убедитесь, что в разложенном виде диван не будет создавать затруднений с перемещением по комнате.</p>
    <p>Теперь, когда вы имеете представление о размерах дивана, переходите к выбору модели и механизма раскладки.</p>
    <p><strong><span style="color:rgb(95,73,122);"><em>Выбираем механизм раскладки</em></span></strong></p>
    <p>Если диван будет использоваться для гостиной или кухни, смело можно рассматривать варианты с любым способом раскладки.</p>
    <p>Если же диван будет служить постоянным спальным местом, стоит обратить внимание на такие механизмы, как «еврокнижка», «аккордеон», «дельфин».</p>
    <p>Диван должен легко раскладываться человеком, который планирует им пользоваться.</p>
    <p>Мебель прослужит долго, если каркас изготовлен из натурального дерева. Допускается присутствие ДСП. Из этого материала, как правило, выполняется бельевой ящик.</p>
    <p><strong><span style="color:rgb(95,73,122);"><em>Подбираем ткань</em></span></strong></p>
    <p>Исходя из назначения дивана, выбирается его обивка.&nbsp;</p>
    <p>Мебель для гостиной будет изящно выглядеть в благородных тканях, типа жаккарда или натуральной кожи. Такой материал непременно подчеркнет ваш статус.</p>
    <p>При выборе мебели для спальной и детской зон стоит отдать предпочтение прочным, легко моющимся тканям: велюру, флоку, шениллу или искусственной коже.</p>
    <p>Для кухни и обеденной зоны идеальным решением станет диван, выполненный из экокожи или натуральной кожи. Такую обивку легко мыть, она не впитывает грязь и запахи.</p>
    <p></p></div>`,
  },
  {
    id: 6,
    slug: '5-vazhnyh-sovetov-o-tom-kak-podgotovitsya-k-pereezdu-svoimi-silami',
    cover: cover6,
    created_at: '09 Ноя 2021',
    title: '5 важных советов о том, как подготовиться к переезду своими силами',
    htmlContent: `<div><p>Переезд в новое жилье – процесс волнительный и приятный. Однако приятным он становится в тот момент, когда все вещи перевезены и разобраны, а мебель расставлена по своим местам. А все, что происходит “ДО”, похоже на стихийное бедствие. Тот, кто хотя бы раз в жизни сталкивался с переездом со всеми своими вещами и мебелью, понимает, о чем мы.<br></p>
    <p>В этой статье мы расскажем о том, как подготовиться к переезду, что понадобится для упаковки и как подготовить мебель к транспортировке.
      </p>
    <p>&nbsp;<br></p>
    <p><b><span style="color:rgb(95,73,122);">С чего начать подготовку</span></b>
      </p>
    <p>Заранее проведите ревизию вещей. Подумайте, что вы хотите забрать в свой новый дом, а что вам не понадобится, не впишется в новый интерьер и т. п.<br></p>
    <p>Кстати, это отличный повод заняться расхламлением. Несколько советов, которые помогут вам в этом:
      </p>
    <ul><li>Избавляйтесь от ненужного. 
      </li><li>Размышляя о “нужности” конкретной вещи, спросите себя, доставляет ли она вам радость? Если внутреннего отклика нет, то выбрасывайте, а не храните годами якобы дорогие сердцу предметы.
      </li><li>Предметы, которые вы не использовали больше года, вряд ли понадобятся вам в новом доме. Избавляйтесь от них без сожаления.
      </li><li>Составляйте рейтинг вещей по их популярности. Аутсайдеров – в ведро. Например, в вашем доме 25 кружек, а пользуетесь вы только тремя? Заберите с собой только те самые три.
      </li><li>Чтобы понять весь масштаб захламленности, вынимайте ВСЕ вещи из всех шкафов. Образовавшаяся гора не даст вам отступить от начатого, а объем даст понять, сколько у вас всего ненужного.
      </li></ul><p>Следуйте этой инструкции, пока не останетесь исключительно с самым необходимым.<br></p>
    <p><img src="https://vobaza.ru/images/blog/2/5346421534.jpg?1624615130742" alt="5346421534.jpg?1624615130742" class="blazy-img-tabs"><br></p>
    <p>Это касается бытовой техники и мебели. Точно ли вам нужен старый бабушкин шифоньер? Возможно, раритет лучше оставить на первое время новым жильцам или вовсе вынести его на мусорку?
      </p>
    <p>Параллельно с ревизией вещей занимайтесь их упаковкой. Только не забывайте подробно подписывать коробки, чтобы при необходимости без труда найти нужное.
      </p>
    <p>Разбирайте комнаты поэтапно. Начинайте с антресолей, кладовой и верхних полок и постепенно переходите к упаковке самых нужных, часто используемых вещей.
      </p>
    <p>&nbsp;<br></p>
    <p><b><span style="color:rgb(95,73,122);">Что понадобится для упаковки вещей</span></b>
      </p>
    <p>Хорошая упаковка – гарантия того, что ваши вещи доедут в целости и сохранности до места назначения. Поэтому рекомендуем не экономить на упаковочных материалах.</p>
    <p>Для переезда вам понадобятся:<br></p>
    <ul><li>листы гофрокартона;
      </li><li>картонные коробки разных размеров;
      </li><li>скотч;
      </li><li>воздушно-пузырьковая пленка;
      </li><li>стрейч-пленка;
      </li><li>инструменты для разбора мебели.
      </li></ul><p>Упаковочный материал можно приобрести в любом строительном магазине.<br></p>
    <p><img src="https://vobaza.ru/images/blog/2/534642153.jpg?1624615528518" alt="534642153.jpg?1624615528518" class="blazy-img-tabs"><br></p>
    <p>&nbsp;
      </p>
    <p><b><span style="color:rgb(95,73,122);">Готовим диван к транспортировке</span></b>
      </p>
    <p>Основная проблема транспортировки дивана заключается в его габаритах. Во-первых, диван очень тяжелый, во-вторых, размеры большинства моделей не позволяют пронести их через дверные проемы и лестничные пролеты, не прибегая к разборке.<br></p>
    <p>Конечно, если нужно вынести кресло, небольшой детский диван или кушетку, то разбирать мебель не стоит, максимум можно снять подлокотники.
      </p>
    <p>Если диван прямой, сначала снимите подлокотники, затем сиденье и спинку.
      </p>
    <p>Если диван угловой, сначала открутите подлокотники, затем разъедините угловой и короткий элементы, выньте выкатной механизм, если таковой имеется.
      </p>
    <p>Надежно упакуйте каждую деталь. Подлокотники и подушки замотайте плотной пленкой. Деревянные комплектующие дополнительно защитите картоном и закрепите скотчем. Болтики и мелкие детали упакуйте в отдельный пакетик.
      </p>
    <p><img src="https://vobaza.ru/images/blog/2/53464215352.jpg?1624615725745" alt="53464215352.jpg?1624615725745" class="blazy-img-tabs">&nbsp;
      </p>
    <p>&nbsp;
      </p>
    <p><b><span style="color:rgb(95,73,122);">Готовим корпусную мебель к транспортировке</span></b>
      </p>
    <p>Негабаритные предметы корпусной мебели обычно перевозят в собранном виде. К таким можно отнести тумбочки, комоды, письменные столы, стулья. Перед транспортировкой надежно закрепите ящики, чтобы во время передвижения они случайно не открылись. Зафиксировать их можно скотчем. Дополнительно облицуйте предметы листами гофрокартона и замотайте в пленку. Помните, чем надежнее упаковка, тем меньше шансов повредить мебель при переезде.<br></p>
    <p>Шкафу, кровати и прочим габаритным предметам мебели потребуется разборка. Сначала нужно снять дверцы, затем вытащить внутренние полки, потом разобрать каркас.<br></p>
    <p>Разбирая мебель, фотографируйте каждый этап. Если вы запутаетесь при последующей сборке, фотографии помогут вам освежить память.
      </p>
    <p>Наклейте специальные стикеры или бумажный скотч на каждую деталь, сделайте пометки “верх”, “низ”, “правая стенка” и т. п. Фурнитуру каждого предмета мебели складывайте в отдельный пакетик и крепите его к одной из деталей скотчем. 
      </p>
    <p>&nbsp;
      </p>
    <p><b><span style="color:rgb(95,73,122);">Загружаем вещи в машину</span></b>
      </p>
    <p>Если у вас нет собственного грузового автомобиля, то нужно заказать транспорт для перевозки вещей. Как правило, транспортные компании помогают определиться с размером кузова, исходя из количества перевозимых вещей. Там же можно заказать услуги профессиональных грузчиков.<br></p>
    <p>В первую очередь загружаются крупные и тяжёлые вещи — мебель и техника. Далее машина заполняется коробками с вещами. Старайтесь не складывать одни вещи на другие, чтобы ничего не повредилось при транспортировке.
      </p>
    <p><img src="https://vobaza.ru/images/blog/2/782032204.jpg?1624615887331" alt="782032204.jpg?1624615887331" class="blazy-img-tabs"><br></p>
    <p>&nbsp;<br></p>
    <p>Начинайте подготовку к переезду минимум за 2 недели до события, действуя по пунктам. Правильная подготовка значительно облегчит переезд.
    </p></div>`,
  },
];

export default blogPosts;
