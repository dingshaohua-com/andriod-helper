import "./style.less";
import andriodImg from "@/assets/andriod.svg";
import apkImg from "@/assets/apk.svg";

function Home() {
  return (
    <div className="home-wrapp">
      <div className="works">
        <div
          className="work"
          onClick={() => $electron.openWindow("/decompiler")}
        >
          <img src={andriodImg} />
          <div>反编译</div>
        </div>

        <div className="work">
          <img src={apkImg} />
          <div>打包</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
