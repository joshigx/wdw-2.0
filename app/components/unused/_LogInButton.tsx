interface LogInButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

 function _LogInButton(props: LogInButtonProps) {
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
