import LogoImg from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img
        className="logo"
        src={LogoImg}
        style={{ height: "100px", width: "100px" }}
      ></img>
    </div>
  );
};

export default Logo;
