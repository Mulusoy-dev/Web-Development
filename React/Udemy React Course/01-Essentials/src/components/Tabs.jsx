const Tabs = ({ children, buttons, buttonsContainer = "menu" }) => {
  const ButtonsContainer = buttonsContainer; // buttonsContainer => 'menu', 'div', 'section' etc.

  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
};

export default Tabs;
