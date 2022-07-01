export const CenteredHeader = (props) => {
  return (
    <div className="text-center" {...props}>
      <h1>{props.text}</h1>
    </div>
  );
};

export default CenteredHeader;
