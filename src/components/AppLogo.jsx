import appLogo from '../../assets/ic_launcher_foreground.png';

export default function AppLogo({ className = '' }) {
  return (
    <img className={`app-logo ${className}`.trim()} src={appLogo} alt="" aria-hidden="true" />
  );
}
