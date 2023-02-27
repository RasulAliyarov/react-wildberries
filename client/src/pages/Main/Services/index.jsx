import React from 'react'
import "./Services.scss"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Icons, Images } from "../../../Config/index"
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { accordionHeadinNumberReducer, accordionChevronToggleReducer } from "../../../redux/Slices/wildSlice"
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { Helmet } from "react-helmet";

function Address() {
  const wildberries = useSelector(state => state.wildberries)
  const dispatch = useDispatch()

  const callback = () => {
    dispatch(accordionChevronToggleReducer(!wildberries.accordionChevronToggle))
  }

  return (
    <div className='services contentBg'>
      <div className="services__wrapper  container1500">
        <Tabs defaultIndex={2}>
          <TabList>
            <Tab>Как сделать заказ</Tab>
            <Tab>Способы оплаты</Tab>
            <Tab >Доставка</Tab>
            <Tab>Возврат товара</Tab>
            <Tab>Возврат денежных средств</Tab>
            <Tab>Правила продажи</Tab>
            <Tab>Правила пользования торговой площадкой</Tab>
          </TabList>

          {/* Как сделать заказ */}
          <TabPanel className="services__wrapper__howOrder">
            <h2 className='tabTtile'>Как сделать заказ</h2>
            <ul>
              <li>
                <h3>1. Войти или зарегистрироваться</h3>
                <p>Оформить заказ можно только в личном кабинете. Войдите или зарегистрируйтесь по номеру телефона:</p>
                <img src={Images.HowDoOrder1} alt="" />
              </li>
              <li>
                <h3>2. Добавить товар в «Корзину»</h3>
                <p>В карточке товара выберите подходящий размер и нажмите «Добавить в корзину»:</p>
                <img src={Images.HowDoOrder2} alt="" />
                <p>Для выбора подходящего размера по параметрам фигуры нажмите ссылку «Таблица размеров»:</p>
                <img src={Images.HowDoOrder3} alt="" />
              </li>
              <li>
                <h3>3. Перейти в корзину</h3>
                <p>Для продолжения оформления заказа перейдите в «Корзину».</p>
                <p>По клику на кнопку «Перейти в корзину» в карточке товара:</p>
                <img src={Images.HowDoOrder4} alt="" />
                <p>Или нажав на корзину в правом верхнем углу сайта:</p>
                <img src={Images.HowDoOrder5} alt="" />
              </li>
              <li>
                <h3>4. Проверить заказ</h3>
                <p>Проверьте состав заказа. Измените количество, отложите или удалите товар, если ошиблись с выбором:</p>
                <img src={Images.HowDoOrder6} alt="" />
              </li>
              <li>
                <h3>5. Выбрать адрес доставки</h3>
                <p>Выберите способ доставки.</p>
                <ul>
                  <li>
                    <h3>5.1 Доставка в пункт выдачи</h3>
                    <p>Выберите удобный пункт выдачи товаров, нажав «Выбрать пункт выдачи»:</p>
                    <img src={Images.HowDoOrder7} alt="" />
                    <p>В пункте выдачи Вы можете проверить и примерить товары. Пункты оборудованы удобными примерочными.</p>
                    <h3>5.2 Доставка курьером</h3>
                    <p>Для указания адреса доставки нажмите «Выбрать адрес»:</p>
                    <img src={Images.HowDoOrder8} alt="" />
                    <p>После поступления заказанных товаров, курьер свяжется с Вами для уточнения даты и времени доставки.</p>
                    <p>При доставке у Вас будет 20 минут на примерку и проверку товара.</p>
                  </li>
                </ul>
              </li>
              <li>
                <h3>6. Выбрать способ оплаты</h3>
                <p>Выберите способ оплаты из предложенных.</p>
              </li>
              <li>
                <h3>7. Завершить оформление заказа</h3>
                <p>Нажмите кнопку «Оплатить заказ». После поступления оплаты заказ будет оформлен.</p>
                <p>Отслеживать информацию о заказе можно в разделе личного кабинета «Покупки».</p>
              </li>
            </ul>
          </TabPanel>

          {/* Способы оплаты */}
          <TabPanel className="services__wrapper__typeOfPay">
            <h2 className='tabTtile'>Способы оплаты</h2>
            <h5>Понравившиеся вещи Вы можете оплатить перечисленными ниже способами.</h5>
            <Accordion allowZeroExpanded>

              {/* Банковская карта */}
              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(1))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Банковская карта</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 1 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <h3>Оплата банковской картой, через Интернет, возможна через системы электронных платежей.</h3>
                  <p className='payTypeP'>Номер карты (PAN) должен иметь не менее 15 и не более 19 символов.</p>
                  <h3>Мы принимаем платежи с сайта по следующим банковским картам</h3>
                  <div>
                    <img src="data:image/svg+xml,%3Csvg%20width%3D%2236%22%20height%3D%2212%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M22.914.545c-2.453%200-4.647%201.273-4.647%203.622%200%202.696%203.89%202.883%203.89%204.235%200%20.571-.655%201.08-1.769%201.08-1.584%200-2.768-.713-2.768-.713l-.508%202.374s1.363.602%203.173.602c2.684%200%204.795-1.336%204.795-3.727%200-2.847-3.906-3.027-3.906-4.287%200-.446.536-.937%201.65-.937%201.256%200%202.28.519%202.28.519l.495-2.29c0%20.003-1.114-.478-2.685-.478zM.46.718l-.06.346s1.032.19%201.963.567c1.197.433%201.283.685%201.484%201.467l2.197%208.47h2.945l4.54-10.85H10.59L7.673%208.095l-1.19-6.253C6.375%201.126%205.822.718%205.143.718H.46zm14.251%200l-2.304%2010.847h2.803L17.503.718H14.71zm15.63%200c-.675%200-1.035.363-1.298.993l-4.104%209.854h2.938l.567-1.644h3.581l.346%201.644h2.595L32.702.718H30.34zm.383%202.93l.872%204.073H29.26l1.463-4.073z%22%20fill%3D%22url(%23paint0_linear)%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear%22%20x1%3D%22.4%22%20y1%3D%226.144%22%20x2%3D%2234.964%22%20y2%3D%226.144%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2320225F%22%2F%3E%3Cstop%20offset%3D%22.2%22%20stop-color%3D%22%231A1F61%22%2F%3E%3Cstop%20offset%3D%22.41%22%20stop-color%3D%22%23172272%22%2F%3E%3Cstop%20offset%3D%22.595%22%20stop-color%3D%22%23152682%22%2F%3E%3Cstop%20offset%3D%22.802%22%20stop-color%3D%22%2312288E%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230E2C9A%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E" alt="" />
                    <img src="data:image/svg+xml,%3Csvg%20width%3D%2226%22%20height%3D%2220%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5.862%2018.641a.61.61%200%2001.63-.63c.387%200%20.629.291.629.63a.61.61%200%2001-.63.63c-.387.048-.629-.243-.629-.63zm1.646%200v-1.017h-.436v.29a.847.847%200%2000-.677-.338c-.581%200-1.017.436-1.017%201.065%200%20.63.436%201.065%201.017%201.065.29%200%20.484-.097.629-.29v.242h.436V18.64h.048zm14.864%200a.61.61%200%2001.63-.63c.387%200%20.629.291.629.63a.61.61%200%2001-.63.63c-.436.048-.63-.243-.63-.63zm1.598%200v-1.84h-.436v1.114c-.145-.194-.34-.34-.63-.34-.58%200-1.016.485-1.016%201.066%200%20.63.435%201.065%201.016%201.065.29%200%20.485-.097.63-.29v.242h.436V18.64zm-11.04-.63c.291%200%20.485.194.533.485h-1.065c.049-.29.242-.484.533-.484zm.05-.435c-.582%200-1.018.436-1.018%201.065%200%20.63.436%201.065%201.017%201.065.29%200%20.581-.097.823-.29l-.193-.34a.93.93%200%2001-.581.194c-.29%200-.533-.145-.581-.484h1.5v-.145c-.048-.63-.435-1.065-.968-1.065zm5.276%201.065a.61.61%200%2001.63-.63c.387%200%20.63.291.63.63a.61.61%200%2001-.63.63c-.387.048-.63-.243-.63-.63zm1.647%200v-1.017h-.436v.29c-.145-.193-.339-.338-.63-.338-.58%200-1.016.436-1.016%201.065%200%20.63.435%201.065%201.016%201.065.291%200%20.485-.097.63-.29v.242h.436V18.64zm-4.116%200c0%20.63.436%201.065%201.065%201.065.29%200%20.485-.048.727-.242l-.194-.339c-.145.097-.339.194-.533.194a.61.61%200%2001-.629-.63c0-.387.242-.629.63-.629.193%200%20.387.049.532.194l.194-.34c-.194-.241-.388-.338-.727-.338-.629%200-1.065.484-1.065%201.065zm5.665-1.065c-.242%200-.436.097-.533.29v-.242h-.435v2.034h.435v-1.114c0-.339.146-.532.436-.532.097%200%20.194%200%20.29.048l.146-.387c-.145-.049-.242-.097-.34-.097zm-11.765.242c-.194-.145-.484-.194-.823-.194-.533%200-.823.242-.823.63%200%20.339.242.532.678.58l.193.05c.242.047.34.096.34.193%200%20.145-.146.242-.485.242-.29%200-.533-.097-.678-.194l-.194.34c.243.193.533.241.872.241.581%200%20.92-.29.92-.678%200-.339-.242-.532-.726-.58l-.194-.05c-.194-.047-.339-.047-.339-.193%200-.145.145-.242.387-.242.242%200%20.485.097.63.194l.242-.339zm5.665-.242c-.242%200-.436.097-.533.29v-.242h-.436v2.034h.436v-1.114c0-.339.145-.532.436-.532.096%200%20.193%200%20.29.048l.145-.436c-.145%200-.242-.048-.338-.048zm-3.777.048h-.726v-.63h-.436v.63h-.387v.436h.387v.92c0%20.484.194.726.726.726a.975.975%200%2000.533-.145l-.145-.387c-.146.096-.29.096-.388.096-.242%200-.29-.145-.29-.338v-.872h.726v-.436zM5.04%2019.658v-1.26c0-.483-.29-.822-.775-.822a.935.935%200%2000-.726.339.847.847%200%2000-.678-.34c-.193%200-.435.05-.58.291v-.242h-.436v2.034h.435v-1.114c0-.339.194-.532.484-.532s.436.193.436.532v1.114h.436v-1.114c0-.339.194-.532.484-.532s.436.193.436.532v1.114h.484z%22%20fill%3D%22%23231F20%22%2F%3E%3Cpath%20d%3D%22M16.213%2014.23H9.551V2.26h6.662v11.968z%22%20fill%3D%22%23FF5F00%22%2F%3E%3Cpath%20d%3D%22M9.977%208.222c0-2.42%201.114-4.6%202.905-6.004C11.575%201.202%209.93.572%208.186.572A7.583%207.583%200%2000.584%208.173a7.583%207.583%200%20007.602%207.602c1.791%200%203.389-.63%204.696-1.646-1.791-1.308-2.905-3.486-2.905-5.907z%22%20fill%3D%22%23EB001B%22%2F%3E%3Cpath%20d%3D%22M25.2%208.222a7.583%207.583%200%2001-7.602%207.601c-1.791%200-3.389-.63-4.696-1.646%201.791-1.404%202.905-3.534%202.905-6.003%200-2.47-1.114-4.6-2.905-6.004C14.209%201.153%2015.855.524%2017.598.524%2021.762.62%2025.2%204.01%2025.2%208.222z%22%20fill%3D%22%23F79E1B%22%2F%3E%3C%2Fsvg%3E%0A" alt="" />
                    <img src="data:image/svg+xml,%3Csvg%20width%3D%2226%22%20height%3D%2220%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M16.605%2014.195h-6.7V2.125h6.7v12.07z%22%20fill%3D%22%236C6BBD%22%2F%3E%3Cpath%20d%3D%22M10.333%208.176a7.67%207.67%200%20012.922-6.054C11.94%201.096%2010.285.462%208.53.462A7.637%207.637%200%2000.887%208.127a7.637%207.637%200%20007.644%207.666c1.802%200%203.409-.635%204.724-1.66-1.802-1.318-2.922-3.515-2.922-5.957z%22%20fill%3D%22%23EB001B%22%2F%3E%3Cpath%20d%3D%22M25.642%208.176a7.637%207.637%200%2001-7.645%207.666c-1.802%200-3.408-.635-4.723-1.66%201.802-1.416%202.921-3.565%202.921-6.055%200-2.49-1.12-4.638-2.921-6.054%201.315-1.026%202.97-1.66%204.723-1.66%204.188.097%207.645%203.515%207.645%207.763z%22%20fill%3D%22%230099DF%22%2F%3E%3Cpath%20d%3D%22M18.864%2017.625c.098%200%20.195%200%20.292.049l-.146.44c-.097-.05-.195-.05-.243-.05-.292%200-.439.196-.439.538v1.123h-.438v-2.051h.438v.244c.098-.195.244-.293.536-.293zm-1.655.44h-.73v.927c0%20.196.048.342.291.342.098%200%20.244-.049.39-.098l.146.391c-.146.098-.39.147-.536.147-.535%200-.681-.293-.681-.733v-.928h-.39v-.39h.39v-.635h.438v.635h.73l-.048.342zm-5.649.44c.049-.294.244-.49.536-.49.292%200%20.487.196.536.49H11.56zm1.51.194c0-.634-.39-1.074-.974-1.074s-1.023.44-1.023%201.074c0%20.635.439%201.075%201.023%201.075.292%200%20.584-.098.828-.293l-.195-.342c-.146.146-.39.195-.584.195-.293%200-.536-.146-.585-.488h1.51v-.147zm1.947-.488a1.216%201.216%200%2000-.633-.195c-.243%200-.39.098-.39.244s.147.195.342.195l.194.05c.439.048.73.243.73.585%200%20.39-.34.684-.924.684-.341%200-.633-.098-.877-.245l.195-.341c.146.097.39.195.682.195.292%200%20.487-.098.487-.244%200-.098-.098-.195-.341-.195l-.195-.05c-.536-.097-.779-.292-.779-.634%200-.39.34-.635.876-.635.293%200%20.585.049.828.195l-.194.391zm5.454-.146c-.097%200-.195%200-.243.048-.098%200-.147.05-.244.098-.097.049-.097.147-.097.244%200%20.098-.049.147-.049.244%200%20.098%200%20.196.049.244.048.05.097.147.146.196.048.049.146.098.195.146.097.05.146.05.243.05s.195%200%20.244-.05c.097%200%20.146-.049.194-.097.049-.05.098-.147.146-.196.049-.097.049-.146.049-.244s0-.195-.049-.244c-.048-.146-.097-.244-.146-.293-.048-.049-.097-.098-.194-.098-.098-.048-.147-.048-.244-.048zm0-.44c.146%200%20.292%200%20.438.098.146.049.244.146.341.244.098.098.195.195.244.342.048.146.097.293.097.44%200%20.146-.049.243-.097.39a1.484%201.484%200%2001-.244.342.784.784%200%2001-.34.195c-.147.098-.293.098-.439.098-.146%200-.292%200-.438-.098a.784.784%200%2001-.341-.195%201.483%201.483%200%2001-.244-.342c-.048-.147-.097-.293-.097-.44%200-.146.049-.293.098-.44.048-.146.145-.243.243-.34.097-.099.195-.196.34-.245.147-.049.293-.049.439-.049zM8.98%2018.7c0-.341.243-.634.633-.634s.633.293.633.634a.615.615%200%2001-.633.635.615.615%200%2001-.633-.635zm1.655%200v-1.025h-.438v.244c-.146-.195-.39-.293-.682-.293-.584%200-1.022.44-1.022%201.074%200%20.635.438%201.075%201.022%201.075.292%200%20.487-.098.633-.293v.244h.438v-1.026h.05zm-2.532%201.026v-1.27c0-.488-.292-.83-.779-.83a.94.94%200%2000-.73.342.785.785%200%2000-.682-.342c-.195%200-.438.049-.584.293v-.244h-.439v2.05h.439v-1.122c0-.342.194-.537.487-.537.292%200%20.438.195.438.537v1.123h.438v-1.123c0-.342.195-.537.487-.537s.438.195.438.537v1.123h.487z%22%20fill%3D%22%23231F20%22%2F%3E%3C%2Fsvg%3E%0A" alt="" />
                    <img src="data:image/svg+xml,%3Csvg%20width%3D%2242%22%20height%3D%2212%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M23.693%201.725l-2.543%205.48h-.257V.544h-3.632v11.2h3.012c.817%200%201.543-.47%201.892-1.196l2.557-5.464h.258v6.66h3.632V.545h-3.057c-.787%200-1.529.469-1.862%201.18zM10.193%202.013L8.694%207.204h-.257L6.923%202.013A2.043%202.043%200%20004.956.545H1.369v11.2H5v-6.66h.258l2.088%206.66H9.77l2.088-6.66h.258v6.66h3.632V.545H12.16c-.908%200-1.725.59-1.967%201.468zM30.126%205.54v6.205h3.632V8.112h3.905a3.877%203.877%200%20003.663-2.573h-11.2z%22%20fill%3D%22%23319B42%22%2F%3E%3Cpath%20d%3D%22M37.557.545h-8.082c.5%202.663%202.83%204.54%205.63%204.54h6.281a4.34%204.34%200%2000.076-.787c0-2.164-1.74-3.753-3.905-3.753z%22%20fill%3D%22url(%23paint0_linear)%22%2F%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22paint0_linear%22%20x1%3D%2229.475%22%20y1%3D%222.815%22%20x2%3D%2241.462%22%20y2%3D%222.815%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20stop-color%3D%22%2300A3E1%22%2F%3E%3Cstop%20offset%3D%22.304%22%20stop-color%3D%22%23009ADD%22%2F%3E%3Cstop%20offset%3D%22.799%22%20stop-color%3D%22%230082D4%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%230076CF%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3C%2Fsvg%3E%0A" alt="" />
                  </div>
                </AccordionItemPanel>
              </AccordionItem>

              {/* Оплата через СБП (Систему быстрых платежей) */}
              <AccordionItem >
                <AccordionItemHeading id='accordionHeadin2' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(2))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Оплата через СБП (Систему быстрых платежей)</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 2 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>

                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <img className='systemFastPayImg' src="https://images.wbstatic.net/basket/payment/sbp.png" alt="" />
                  <p className='systemFastPayP'>Система быстрых платежей (далее "СБП") - сервис платежной системы Банка России, позволяющий физическим лицам производить оплату за товар/услуги с помощью любого банка-участника СБП.</p>
                  <p className='systemFastPayP'>Список банков-участников опубликован на официальном сайте https://sbp.nspk.ru/participants/</p>
                  <p className='systemFastPayP'>Безопасность переводов обеспечивается на стороне всех банков-участников СБП: банков, Банка России и НСПК с использованием современных систем защиты. СБП соответствует всем стандартам информационной безопасности.</p>
                </AccordionItemPanel>
              </AccordionItem>

              {/* Оплата в кредит или рассрочку */}
              <AccordionItem >
                <AccordionItemHeading id='accordionHeadin3' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(3))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Оплата в кредит или рассрочку</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 3 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <ul>
                    <li> — Выберите понравившиеся товары и положите их в корзину</li>
                    <li> — Выберите способ оплаты «Рассрочка» или «Кредит»</li>
                    <li> — Заполните анкету и дождитесь решения банка</li>
                    <li> — Подпишите кредитный договор по SMS и получите ваш заказ</li>
                  </ul>
                  <p>Кредитные условия индивидуальны для каждого покупателя. С условиями можно будет ознакомиться в момент оформления кредитного договора.
                    Кредит доступен на все товары при стоимости корзины от 5000 рублей
                  </p>
                  <ul>
                    <h4> — Для оформления кредита необходимо:</h4>
                    <li> — Быть гражданином РФ</li>
                    <li> — Иметь постоянную регистрацию</li>
                    <li> — Быть старше 18 лет</li>
                    <li> — Иметь постоянный доход</li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              {/* Оплата балансом */}
              <AccordionItem >
                <AccordionItemHeading id='accordionHeadin4' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(4))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Оплата балансом</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 4 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p className='balancePay'>
                    Возврат денежных средств за возвращенный товар осуществляется на Баланс ЛК для распоряжения покупателем по своему усмотрению. Покупатель вправе оплатить денежными средствами последующие покупки или осуществить их перевод на реквизиты своего расчётного счета, а также осуществить перевод через СБП. Для осуществления возврата покупателю необходимо заполнить форму в разделе «Баланс».
                  </p>

                  <p className='balancePay'>
                    Баланс ЛК является приоритетным способом оплаты заказов. Вне зависимости от выбранного способа оплаты вся стоимость товара будет списана с Баланса ЛК. Если средств на Балансе ЛК недостаточно для полной оплаты заказанных товаров, оставшаяся часть стоимость будет списана с Банковской карты покупателя.
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          {/* Доставка */}
          <TabPanel className="services__wrapper__delivered">
            <h2 className='tabTtile'>Доставка</h2>
            <div className="services__wrapper__delivered__top">
              <div className="services__wrapper__delivered__top__left">
                <h1>Быстро доставим любой Ваш заказ по всей России</h1>
                <div>
                  <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHcSURBVHgB7ZjRcYMwDIZFJ2AEj5ANwgYdIdmg2YBukG7ACGkn4DpBuoG7QbKBKhdzUYSDwdhJHvzf6SBgWx+2IhkAsrKyoqiAiELEig6K7Ez2UxTFLzyTCFCRtTjUO1kJj5aBsDAnC2aODdmBwWqyDTxCDkC0gCVroywkB17BvWTikOzIAMz5eqT9VgCbB1KQSiNxOMk53a8xZfzeiEPjdEW2F0u7A//DNqLP8vh1xFkjZyHEuWtcWCKx1D7ns2MRr7PDGwRCljjUFOc7AbyXfbD7Q7Zi7AOEyC6PUZ8b5y7toI99+A92/YSXONcQIgaq2W+ZyF8njNGiW7UFV1FB2fVZsYjdMvPC0PL2yUDZ/VoAXOVFx2xqdBSG5KCsTSNgNha613/eXeJnMahoq3GoPXqqz11BWZ8dm8V1TD8vEFef9nimTfM3RFRs0GTKoLH1DKB9VjiPNRoD7TuWmPYFbSX8zRerLBq7V2Ff+1kpzaazvrqFb6DRvXFWnvZeUOzq/9W4EEPorusKZoLixPq/FNb7yoG3d1yufWgNKWVhjgK4ugUq4tDIW/9jA29xGL8Vhxf3W7znBwgHcC1mTEpHj8NQOeI3ehzG/uyo6FCZU7Iv2kGFJ/GsrKw0+gMu2BUk3jPYawAAAABJRU5ErkJggg==" alt="" /><span>Бесплатная доставка</span></div>
                  <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG/SURBVHgB7ZfRUcMwDIaVO97JBnUngA3ICIzABnSD0AnKBmGDsEHZIDBBwgTNBkKiylWYxHESlz7g706Xayyrf+xIcgAikUgk8i9IIBCIeEsXtpXc+iRrkiR5g0tD4gzZjuyAw9RkBfs64mSu8aUiN5bATlAuVpJVluinnjipjO0hJBK4VH/O4u4c/kZ8tH9qjX8/KIREiaxdAnvmZTIHZaXTswnlrVMiDUxERGmxJrhQFRCnrOSI2FpWOqjQonvHYCGW2IOPUO86ylsFxzq5ptrYwER45ehi1C2utxuyLrG45q6H5l+BP1uy65kiWcxY+Wldg95CSeArzITmtnisocbh9g6RP8SZTLRd/LLfOFw4AbZwafB3r+4jhRnQvAeye1//sWTSIjgrn8kadY9XtIWJSFfjeswJNDtJdcDaLsoY4DgWsnl0ATuhmdX2DMwETy0TMdQZVIlbSdurloi1WmcOodBC5Xdqic0mxNK7UkJIbKFK7IvavgLHPzMK5c/n2VmVwiV0L8HTnrEcf1KJiFysUA/KcEI+wjmQd8rnM6PGYVjgDhcmTsjPZX4gA6eDR0P2QXU2HjYikUgk4s8Xf0zxzmbbA8EAAAAASUVORK5CYII=" alt="" /><span>Доставка круглый год по всей России</span></div>
                  <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIiSURBVHgB7ZbRcYMwDIadXt9LJyidoN0gbNBskGyQEWAD2gnIBhmBERiB6wTpBqqdyBeh2FiGNsmD/zsfGGTpsyUblEpKSkqaLADITFP3KITb6NbqdoCT9rqtbw7tgfPputABOPNsS/rWzgedq7+UEC4j9keRfj4C3c6G1oMLKRwbNwBl70LQKxUJmTsA9yCosTFQR4yGxTiIVxdOqe5xYMcc9aFUSUBJtrjvY0wlBG3IwAxnXhJHVsauUEJQ9LVlfswK1rq9sQWqQ5AVgcwd7z8cK9EBOXo4KE60gmEpHXDymbpcaavCB/lOjEaLGs711bPgDQ3kmJTpLwO+a7JYmcugJ85yJRT4dzGfwFLoj65q6TJoWIAmEtis8p75qEH4NXJkwExw7TNezgHWdp98rGCMC7AUTRD852gRCOhSJQS0kHH/A3CuWZ7OlqcEhkdLT+ysihFAe0Qdx6pYkYAv4D5LewsM55T3aAd4LQnMCjwpRv/zQdnzjQPYKqegaM8zclGD/wI6AmzBSta3ZeHdJFLQRzVBi8Vipy87A6yvT7r/5bH70ZdXA4j3kxUCfdbt2/cSgYMKQIp2+kPgfQuRh79UWBaViYGP4lcc66ZlGyEIzGt0DBCGZ7WJ9a6mCtw/uKZfqEjQEUDRf8AcYBNkFQK9CqAH2HxJehLU3K856E0APcCuw7/F++6mgB5oDgx3BciFwN3dAnKB57OblJSUFKdfG0Xiohw0F0cAAAAASUVORK5CYII=" alt="" /><span>Возврат товара при примерке</span></div>
                </div>
                <button onClick={() => {
                  window.scrollTo({
                    top: 1000,
                    left: 0,
                    behavior: "smooth"
                  });
                }}>Узнать условия</button>
              </div>
              <div className="services__wrapper__delivered__top__right">
                <img src={Images.Drone} alt="" />
              </div>
            </div>

            <div className='countBase'>
              <h4> <CountUp delay={0} end={26987} separator={" "} enableScrollSpy={true} /></h4>
              <p>пунктов выдачи</p>
            </div>

            <h2 className='tabTtile'>Информация о доставке и пунктах выдачи</h2>

            <div className="services__wrapper__delivered__bottom">
              <div className="services__wrapper__delivered__bottom__map">
                <div className="services__wrapper__delivered__bottom__map__left">
                  <span className='services__wrapper__delivered__bottom__map__left__top'>
                    <h3 className='baseSetTitle'>Пункты выдачи</h3>
                    <span>
                      <input type="text" name="" id="" placeholder='Поиск пункта выдачи' />
                      <button>Найти</button>
                    </span>
                  </span>

                  <div className="services__wrapper__delivered__bottom__map__left__addresses">

                    <div className="services__wrapper__delivered__bottom__map__left__addresses__address">
                      <div className='services__wrapper__delivered__bottom__map__left__addresses__address__top'>
                        <span>г. Москва, м Текстильщики, 8-я улица Текстильщиков, д. 10</span>
                      </div>

                      <div className='services__wrapper__delivered__bottom__map__left__addresses__address__workTime'>
                        <span>Ежедневно 08:00-22:00 </span>
                        <span>Пункт выдачи </span>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="services__wrapper__delivered__bottom__map__right">
                  <iframe className='deliveredMap' src="https://yandex.ru/map-widget/v1/?um=constructor%3A45f4c42c10dd475562b7d5afbf84f438bc5c407afc0711035da7bf486293362f&amp;source=constructor" width="763" height="700" frameBorder="0"></iframe>
                </div>
              </div>
            </div>
          </TabPanel>

          {/* Возврат товара */}
          <TabPanel className="services__wrapper__return">
            <h2 className='tabTtile tabTtile--modified'>Возврат товара надлежащего качества</h2>
            <h3 className="services__wrapper__return__subTitle">Условия возврата</h3>
            <p>Товар принимается к возврату только в полной комплектации, со всеми упаковками и наклейками, в неношеном/неиспользованном виде</p>
            <h3 className="services__wrapper__return__subTitle">Причины возврата</h3>
            <ul>
              <li> — Не подошел размер, фасон, цвет, длина и т.п.</li>
              <li> — Оттенок полученного товара отличается от оттенка модели с фотографии на сайте</li>
            </ul>
            <h3 className="services__wrapper__return__subTitle">Срок возврата</h3>
            <p>Срок возврата товара надлежащего качества составляет 14 дней с момента получения товара, если иное не было оговорено при продаже товара</p>
            <h3 className="services__wrapper__return__subTitle">Как вернуть товар</h3>
            <ol>
              <li>
                <h4>В пункты выдачи/возврата Wildberries</h4>
                <p>Покупатель может самостоятельно вернуть неподошедший товар в наши фирменные пункты выдачи/возврата</p>
              </li>
              <li>
                <h4>Курьером Wildberries</h4>
                <p>
                  Услуга доступна для населенных пунктов, куда осуществляется доставка курьером
                  Курьером можно вернуть не более 10 позиций в день. Количество товаров для возврата в пункты выдачи не ограничено
                </p>
              </li>
            </ol>
            <h2 className='tabTtile'>Возврат товара ненадлежащего качества</h2>
            <h3 className="services__wrapper__return__subTitle">Причина возврата</h3>
            <p>Производственный недостаток (брак) товара</p>
            <h3 className="services__wrapper__return__subTitle">Срок возврата</h3>
            <p>
              Покупатель может вернуть товар в течение гарантийного срока, установленного производителем.<br />
              Если гарантийный срок производителем не установлен, срок для возврата составляет 2 (два) года.
            </p>
            <h3 className="services__wrapper__return__subTitle">Как вернуть товар</h3>
            <ul>
              <li> — Оформить заявку в Личном кабинете. Срок рассмотрения заявки не превышает 7 (семь) рабочих дней</li>
              <li> — В случае, если по результату рассмотрения заявки продавцом принято положительное решение, покупатель может вернуть товар в Пункт выдачи Wildberries</li>
              <li> — В случае отклонения заявки, покупатель вправе обратиться в независимую экспертизу. В случае, если независимой экспертизой будет подтверждено право покупателя на возврат товара, все расходы покупателя, связанные с проведением независимой экспертизы подлежат возмещению продавцом</li>
            </ul>
          </TabPanel>

          {/* Возврат денежных средств */}
          <TabPanel className="services__wrapper__typeOfPay services__wrapper__returnMoney">
            <h2 className='tabTtile tabTtile--modified'>Возврат денежных средств</h2>
            <h3 className=' services__wrapper__returnMoney__subTtile'>Возврат денежных средств Покупателю Вайлдберриз осуществляется следующими способами:</h3>
            <Accordion allowZeroExpanded>
              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(1))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Безналичный расчет</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 1 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <p>При отказе Покупателя от товара, который был оплачен онлайн банковской картой, денежные средства за него будут автоматически возвращены на банковскую карту, с которой указанный товар был оплачен.</p>
                  <p>После этого срок зачисления денежных средств на Ваш банковский счет будет зависеть от условий банка, в котором он открыт.</p>

                  <h3>Оформление возврата денежных средств на реквизиты.</h3>
                  <p>Для оформления возврата денежных средств на реквизиты необходимо направить обращение в раздел ЛК «Обращения» и добавить реквизиты своего расчётного счета в раздел «Личные данные» «Реквизиты».</p>
                  <p>Перечисление денежных средств может занять до 10 календарных дней.</p>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(2))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Кредит или рассрочка</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 2 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <p>При отказе Покупателя от товара надлежащего качества, приобретенного посредством выбора оплаты в рассрочку или в кредит с привлечением средств кредитной организации (Банка), возврату подлежит сумма в размере стоимости товара, за исключением расходов Вайлдберриз на доставку от Покупателя возвращенного товара.</p>
                  <p>Возврат денежных средств производится на кредитный банковский счет Покупателя. Выплата процентов и иных платежей по договору кредита, заключенного Покупателем с кредитной организацией (Банком) указанным способом, Покупателю не компенсируются. Все обязательства перед кредитной организацией покупатель несёт самостоятельно.</p>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(3))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>Баланс</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 3 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <p>Возврат денежных средств за возвращенный товар осуществляется на Баланс ЛК для распоряжения покупателем по своему усмотрению. Покупатель вправе оплатить денежными средствами последующие покупки или осуществить их перевод на реквизиты своего расчётного счета. Для перевода на реквизиты своего расчётного счета, покупателю необходимо заполнить форму в разделе «Профиль» «Личные данные» или в разделе «Баланс».</p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>

          {/* Правила продажи */}
          <TabPanel className="services__wrapper__saleRules">
            <h2 className='tabTtile tabTtile--modified'>Правила продажи товаров в интернет-магазине Wildberries</h2>
            <ul>
              <li>Товары, размещенные на сайте, предназначены для личного потребления.</li>
              <li>Закон «О защите прав потребителей».</li>
              <li>Гражданский кодекс Российской Федерации (Часть вторая), подробная информация указана в статье 497 Гражданского кодекса Российской Федерации.</li>
              <li>Постановление Правительства Российской Федерации от 31.12.2020 № 2463 «Об утверждении Правил продажи товаров по договору розничной купли-продажи, перечня товаров длительного пользования, на которые не распространяется требование потребителя о безвозмездном предоставлении ему товара, обладающего этими же основными потребительскими свойствами, на период ремонта или замены такого товара и перечня непродовольственных товаров надлежащего качества, не подлежащих обмену, а также о внесении изменений в некоторые акты Правительства Российской Федерации».</li>
              <li>Заказ формируется через интернет-сайт ООО «Вайлдберриз» (www.wildberries.ru).</li>
              <li>Актуальная стоимость доставки в Ваш регион указана при оформлении заказа в разделе «Корзина».</li>
              <li>Правила и условия эффективного и безопасного использования Товаров указаны на ярлыках или в инструкции по эксплуатации Товара.</li>
              <li>При доставке предоплаченного заказа, заказ выдаётся исключительно в случае предъявления Покупателем кода для получения заказа, отраженного в личном кабинете Покупателя, или QR-кода из мобильного приложения Покупателя. При непредъявлении Покупателем указанного кода или QR-кода выдача заказа Покупателю не осуществляется.</li>
            </ul>
          </TabPanel>

          {/* Правила пользования торговой площадкой */}
          <TabPanel className="services__wrapper__typeOfPay services__wrapper__useRules">
            <h2 className='tabTtile tabTtile--modified'>Правила пользования торговой площадкой «Wildberries»</h2>
            <Accordion allowZeroExpanded>
              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(1))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>1. Термины и определения</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 1 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      1.1. <p>В настоящих Правилах, если контекст не требует иного, нижеприведенные термины имеют следующие значения и являются их составной неотъемлемой частью:</p>
                    </li>
                    <li>
                      1.2. <p>Торговая площадка — веб-сайт https://www.wildberries.ru и мобильное приложение Wildberries, являющиеся сервисом, предоставляющим доступ к информации о товарах, предназначенной для потенциальных Покупателей (потребителей).</p>
                    </li>
                    <li>
                      1.3. <p>Продавец — индивидуальный предприниматель, юридическое лицо или самозанятый гражданин, осуществляющие деятельность по продаже товаров и предлагающие Покупателю заключить договор купли-продажи Товара, размещая Товары на Торговой площадке.</p>
                    </li>
                    <li>
                      1.4. <p>Товар — предмет договора купли-продажи, заключаемого между Покупателем и Продавцом. Продавец является собственником реализуемого Товара. Все взаимоотношения, связанные с куплей-продажей Товара возникают между Продавцом, размещающим Товар на Торговой площадке и Покупателем.</p>
                    </li>
                    <li>
                      1.5. <p>Личный кабинет — персональный и не доступный третьим лицам раздел Торговой площадки, служащий в целях оформления Заказов и оформления Услуг, а также получения специальных предложений в соответствии с настоящими Правилами, доступ к которому осуществляется после регистрации путем ввода аутентификационных данных Покупателя.</p>
                    </li>
                    <li>
                      1.6. <p>Пункт выдачи заказов — обособленное подразделение Вайлдберриз, осуществляющее выдачу Заказов Покупателям, указавших адрес соответствующего Пункта выдачи заказов в качестве места доставки.</p>
                    </li>
                    <li>
                      1.7. <p>Скидка по промокоду — это скидка, которая предоставляется на определенную группу Товаров при оформлении Покупателем Заказа.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(2))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>2. Общие положения</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 2 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      2.1. <p>Пользуясь Торговой площадкой, Покупатель соглашается с условиями настоящих Правил.</p>
                    </li>
                    <li>
                      2.2. <p>Торговая площадка предоставляет Покупателю безвозмездную возможность поиска информации о Товарах, ознакомления с товарными предложениями Вайлдберриз и других Продавцов, возможность получения (в т.ч. по результатам поиска) товарных предложений и информации, а также иные функциональные возможности.</p>
                    </li>
                    <li>
                      2.3. <p>Вайлдберриз вправе самостоятельно и без уведомления Покупателя отбирать отзывы для публикации, в том числе:</p>
                    </li>
                    <li>
                      2.4. <p>Покупатель соглашается с тем, что размещенные им на Торговой площадке сообщения и материалы могут быть использованы Вайлдберриз, в том числе в иных сервисах и приложениях Вайлдберриз, в рекламных или маркетинговых материалах, размещаемых на ресурсах Вайлдберриз в сети Интернет, а также на иных ресурсах и сайтах в сети Интернет, для привлечения внимания других потребителей к Торговой площадке в целом или к товарам и услугам третьих лиц, как с указанием автора сообщения или материала (в качестве имени автора при этом будет указываться имя Покупателя, которое он указал при регистрации или в настройках своих данных в Личном кабинете), так и без этого, без обязанности предоставлять отчеты об использовании таких сообщений и материалов, без необходимости получения специального разрешения Покупателя и без выплаты авторского вознаграждения, на территории всего мира без ограничения срока, с правом Вайлдберриз предоставлять указанные права использования таких сообщений и материалов третьим лицам.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(3))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>3. Регистрация на сайте</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 3 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      3.1. <p>Оформить Заказ на Торговой площадке могут только зарегистрированные Покупатели, при этом Покупатель вправе зарегистрироваться на сайте только 1(один) раз, т.е. может иметь только один Личный кабинет.</p>
                    </li>
                    <li>
                      3.2. <p>При регистрации на Торговой площадке, а также при дальнейшем ее использовании, Покупатель предоставляет Вайлдберриз свои регистрационные данные (в том числе, персональные данные), включая, но не ограничиваясь: Ф.И.О., номер телефона, адрес электронной почты, адрес места нахождения, пол, дату рождения, сведения о параметрах фигуры (размере одежды), реквизиты электронных средств платежа (номер, срок действия, код CVV/CVC), и т.д.</p>
                    </li>
                    <li>
                      3.3. <p>Вайлдберриз осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение регистрационных данных Покупателя (в том числе, персональных данных).</p>
                    </li>
                    <li>
                      3.4. <p>Вайлдберриз не несет ответственности за точность и правильность информации, предоставляемой Покупателем при регистрации.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(4))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>4. Оформление заказа на Торговой площадке</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 4 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      4.1. <p>Договор купли-продажи считается заключенным на условиях настоящих Правил и влечет правовые последствия для Продавца, Вайлдберриз и Покупателя только при заказе товара, его оплаты посредством использования сервисов Торговой площадки, по результатам которых сведения о заказе отражаются в ЛК Покупателя.</p>
                    </li>
                    <li>
                      4.2. <p>Заключение договоров с любыми третьими лицами вне программных способов на сайте или мобильном приложении Торговой площадки Вайлдберриз, а равно оплата заказа иным способом, нежели оплата с использованием специального программного обеспечения на сайте или мобильном приложении Торговой площадки (например, оплата наличными третьему лицу, перечисление денежных средств на банковские реквизиты, оплата по счетам, счетам-фактурам, договорам-счетам и иным первичным документам, полученным от третьих лиц) не порождает правовых последствий для Вайлдберриз, как для владельца Торговой площадки, в т.ч. при получении предложения о заключении такого договора из информации о товарах, размещенной на сайте или в мобильном приложении Торговой площадки.</p>
                    </li>
                    <li>
                      4.3. <p>Заказывая на Торговой площадке Товар, реализуемый иными Продавцами, Покупатель в рамках договора купли-продажи вступает в договорные отношения непосредственно с Продавцом, реализующим данный Товар. Доставка Товара, а также прием оплаты от Покупателей за Товар, приобретаемый на Торговой площадке осуществляется Вайлдберриз.</p>
                    </li>
                    <li>
                      4.4. <p>До момента совершения Заказа Покупатель обязуется ознакомиться со всеми условиями оказания Услуг Вайлдберриз, а также приобретения Товаров на Торговой площадке. При этом очевидные ошибки, включая опечатки, допущенные в описании Товара либо в описании Услуги, юридически обязывающими не являются.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(5))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>5. Цена и оплата</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 5 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      5.1. <p>Неотъемлемым условием оформления Заказа на Торговой площадке является заключение Покупателем с Вайлдберриз договора на оказание услуг доставки Товаров, размещенных на Торговой площадке.</p>
                    </li>
                    <li>
                      5.2. <p>В рамках одного Заказа Покупателем может быть заключен договор оказания услуги доставки Товаров нескольких Продавцов, с одновременным заключением нескольких договоров купли-продажи в отношении выбранных Покупателем Товаров. Стоимость курьерской доставки составляет 199 руб.</p>
                    </li>
                    <li>
                      5.3. <p>Право собственности на Заказанные Товары переходит к Покупателю с момента фактической передачи Товара Покупателю и оплаты последним полной стоимости Товара, а также услуги доставки Товара. Риск его случайной гибели или повреждения Товара переходит к Покупателю с момента фактической передачи Товара Покупателю.</p>
                    </li>
                    <li>
                      5.4. <p>Цены на Товар определяются Продавцами, а цены на услугу доставки определяются Вайлдберриз в одностороннем бесспорном порядке и указываются на Торговой площадке.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(6))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>6. Права и обязанности сторон</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 6 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      6.1. <p>Обрабатывать персональные данные Покупателя в порядке, установленном действующим законодательством и Политикой Вайлдберриз в отношении организации обработки и обеспечения безопасности персональных данных.</p>
                    </li>
                    <li>
                      6.2. <p>В случае достижения цели обработки персональных данных Покупателя, Вайлдберриз обязуется прекратить обработку персональных данных или обеспечить ее прекращение (если обработка персональных данных осуществляется другим лицом, действующим по поручению Вайлдберриз) и уничтожить персональные данные или обеспечить их уничтожение (если обработка персональных данных осуществляется другим лицом, действующим по поручению Вайлдберриз) в срок, не превышающий тридцати дней с даты достижения цели обработки персональных данных, если иное не предусмотрено договором, стороной которого, выгодоприобретателем или поручителем по которому является Покупатель, иным соглашением между Вайлдберриз и Покупателем.</p>
                    </li>
                    <li>
                      6.3. <p>В случае отзыва Покупателем согласия на обработку его персональных данных Вайлдберриз обязуется прекратить их обработку или обеспечить прекращение такой обработки (если обработка персональных данных осуществляется другим лицом, действующим по поручению Вайлдберриз) и в случае, если сохранение персональных данных более не требуется для целей обработки персональных данных, уничтожить персональные данные или обеспечить их уничтожение (если обработка персональных данных осуществляется другим лицом, действующим по поручению Вайлдберриз) в срок, не превышающий тридцати дней с даты поступления указанного отзыва, если иное не предусмотрено договором, стороной которого, выгодоприобретателем или поручителем по которому является Покупатель.</p>
                    </li>
                    <li>
                      6.4. <p>Осуществлять записи телефонных переговоров с Покупателем. В соответствии с п. 4 ст. 16 Федерального закона «Об информации, информационных технологиях и о защите информации» Вайлдберриз обязуется: предотвращать попытки несанкционированного доступа к информации и/или передачу ее лицам, не имеющим непосредственного отношения к исполнению Заказов, своевременно обнаруживать и пресекать такие факты.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(7))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>7. Доставка и возврат товара</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 7 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      7.1. <p>Доставка Товара Покупателю осуществляется на условиях, изложенных в настоящих Правилах, и в период времени, автоматически определённый системой при оформлении заказа, который является ориентировочным и может быть увеличен при наступлении обстоятельств, которые не позволяют доставить товар в такой срок. При превышении разумного срока на доставку товара покупатель имеет возможность осуществить отказ от товара в Личном кабинете. Если Покупатель, при доставке товара в место, указанное Покупателем, не получает заказ в указанный в Личном кабинете срок хранения, Вайлдберриз вправе аннулировать заказ без дополнительного информирования Покупателя. В случае если Заказ предоплачен, денежные средства возвращаются Покупателю в установленный законодательством срок, за исключением расходов Продавца на доставку от потребителя возвращенного товара.</p>
                    </li>
                    <li>
                      7.2. <p>В случае обнаружения в товаре, за исключением крупногабаритных товаров, доставленных «до двери», явных недостатков в присутствии представителя Вайлдберриз, Покупатель имеет право отказаться от такого товара при получении с соблюдением порядка, предусмотренного пп. 7.8.3 – 7.8.6 настоящих Правил.</p>
                    </li>
                    <li>
                      7.3. <p>Доставка Товара Покупателю осуществляется в место, указанное Покупателем. В качестве места доставки Покупатель может указать адрес Пункта выдачи заказов, Постамата или иной адрес, в этом случае доставка Товара осуществляется «до двери».</p>
                    </li>
                    <li>
                      7.4. <p>Доставка «до двери» может быть осуществлена по адресу, указанному Покупателем в Заказе. Передача Заказа Покупателю и расчет Покупателя с представителем Вайлдберриз, осуществляющим доставку возможен только в зданиях.</p>
                    </li>
                    <li>
                      7.5. <p>Проверка и примерка заказанного Товара, как и все взаиморасчеты Покупателя с представителем Вайлдберриз, осуществляющим доставку, производятся не более, чем за 20 минут.</p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem  >
                <AccordionItemHeading id='accordionHeadin1' onClick={() => {
                  dispatch(accordionHeadinNumberReducer(8))
                  callback()
                }}>
                  <AccordionItemButton>
                    <h3>8. Форс-мажор</h3>
                    <span className={wildberries.accordionChevronToggle && wildberries.accordionHeadinNumber === 8 ? 'UpChevron' : 'DownChevron'}>{Icons.DownChevron}</span>
                  </AccordionItemButton>
                </AccordionItemHeading>

                <AccordionItemPanel>
                  <ul>
                    <li>
                      8.1. <p>Вайлдберриз освобождается от ответственности за полное или частичное неисполнение своих обязательств в соответствии с настоящими Правилами, если это неисполнение было вызвано обстоятельствами непреодолимой силы, возникшими после принятия Покупателем условий настоящих Правил. «Обстоятельства Непреодолимой Силы», означают чрезвычайные события или обстоятельства, которые нельзя было предвидеть или предотвратить доступными средствами. Такие чрезвычайные события или обстоятельства включают в себя, в частности: забастовки, наводнения, пожары, землетрясения и иные стихийные бедствия, войны, военные действия, действия российских или иностранных государственных органов, а также любые иные обстоятельства, выходящие за пределы разумного контроля. </p>
                    </li>
                  </ul>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
          </TabPanel>
        </Tabs>

      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Wildberries - About us</title>
      </Helmet>
    </div>
  )
}

export default Address