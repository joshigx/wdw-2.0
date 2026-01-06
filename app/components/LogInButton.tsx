interface LogInButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function LogInButton(props: LogInButtonProps) {
  return (
    <>
      <button
        onClick={props.onClick}
        type="button"
      >
        {props.children}
      </button>
    </>
  );
}
