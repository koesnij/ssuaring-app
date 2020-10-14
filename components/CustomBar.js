export const HeaderArea = styled.View`
  top: 0;
  left: 0;
  height: 100;
  width: ${constants.width};
  position: absolute;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-between;
  background-color: white;
  border-bottom-width: 0.2px;
  border-bottom-color: ${styles.darkGreyColor};
`;

const HeaderLeft = styled.View`
  top: 30;
  left: 0;
  width: ${constants.width / 2};
  height: 70;
  position: absolute;

  padding: 0px 20px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;
const HeaderRight = styled.View`
  top: 30;
  left: ${constants.width / 2};
  width: ${constants.width / 2};
  height: 70;
  position: absolute;

  padding: 0px 20px;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

const BodyArea = styled.View`
  top: 100;
  left: 0;
  height: ${constants.height - 100};
  width: ${constants.width};
`;
