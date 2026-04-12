import SecondaryButton from "./ui/SecondaryButton";

function BtnSecondary({ icon, text, children, ...props }) {
  return (
    <SecondaryButton {...props}>
      {children || (
        <>
          {icon}
          {text}
        </>
      )}
    </SecondaryButton>
  );
}

export default BtnSecondary;
