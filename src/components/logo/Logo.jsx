import LogoImg from '../../assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <img className="logo" src={LogoImg}></img>
    </div>
  );
};

export default Logo;
