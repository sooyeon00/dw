import scissorImg from "./assets/scissor.svg";
import rockImg from "./assets/rock.svg";
import paperImg from "./assets/paper.svg";

const IMAGES = {
  rock: rockImg,
  scissor: scissorImg,
  paper: paperImg,
};

// 주먹 가위 보 중에 하나 골라내는 것
function HandIcon({ value, className }) {
  const src = IMAGES[value];
  return <img src={src} className={className} />;
}

export default HandIcon;
