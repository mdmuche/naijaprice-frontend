import Button from "./ui/Button";

function Btn({ btnText, children, variant = "text", ...props }) {
  return (
    <div className="flex items-center justify-center">
      <Button variant={variant} {...props}>
        {children || btnText}
      </Button>
    </div>
  );
}

export default Btn;
