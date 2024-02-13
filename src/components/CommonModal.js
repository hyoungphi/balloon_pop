function CommonModal({ children, ...props }) {
  const title = props.title || 'Modal';

  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default CommonModal;
