import closeIcon from "./../../images/close-Icon.png";
import successIcon from "./../../images/success-icon.png";
import errorIcon from "./../../images/error-icon.png";

function InfoTooltip(props) {
  return (
    <>
      <div
        className={`popup popup_tooltip  ${
          props.isTooltipPopupOpen ? "popup_enabled" : ""
        }`}
      >
        <div className=" popup__body">
          <div className="popup__dialog">
            <img
              src={closeIcon}
              alt="кнопка закрыть"
              className="popup__close-btn"
              onClick={props.onClose}
            />
            <img
              src={props.tooltipPopupStatus ? successIcon : errorIcon}
              style={{
                height: "120px",
                width: "120px",
                margin: "24px auto 32px",
              }}
              alt="Иконка"
            />
            <h2
              className="popup__title"
              style={{ paddingBottom: "24px", textAlign: "center" }}
            >
              {props.tooltipPopupStatus
                ? props.tooltipPopupMessage || "Вы успешно зарегистрировались!"
                : props.tooltipPopupMessage || "Что-то пошло не так! Попробуйте ещё раз."}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
export default InfoTooltip;
