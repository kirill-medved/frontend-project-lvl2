const actionAST = (type, props) => {
  // this function collects a ready-made array from the received data to add it to the ast tree
  let messageValue = null;
  let messageValue1 = null;
  let messageValue2 = null;
  switch (type) {
    case 'removed':
      return [
        props.parent,
        {
          type,
          message: `Property '${props.path.concat(props.parent)}' was removed`,
          value: props.value1,
        },
      ];

    case 'added':
      if (Array.isArray(props.value1)) {
        messageValue = '[complex value]';
      } else if (typeof props.value1 === 'string') {
        messageValue = `'${props.value1}'`;
      } else {
        messageValue = props.value1;
      }
      return [
        props.parent,
        {
          type,
          message: `Property '${props.path.concat(
            props.parent,
          )}' was added with value: ${messageValue}`,
          value: props.value1,
        },
      ];

    case 'updated':
      if (Array.isArray(props.value1)) {
        messageValue1 = '[complex value]';
      } else if (typeof props.value1 === 'string') {
        messageValue1 = `'${props.value1}'`;
      } else {
        messageValue1 = props.value1;
      }

      if (Array.isArray(props.value2)) {
        messageValue2 = '[complex value]';
      } else if (typeof props.value2 === 'string') {
        messageValue2 = `'${props.value2}'`;
      } else {
        messageValue2 = props.value2;
      }
      return [
        props.parent,
        {
          type,
          message: `Property '${props.path.concat(
            props.parent,
          )}' was updated. From ${messageValue1} to ${messageValue2}`,
          value1: props.value1,
          value2: props.value2,
        },
      ];

    case 'same':
      return [
        props.parent,
        {
          type,
          message: `Property ${props.path.concat(props.parent)} wasn't change`,
          value: props.value1,
        },
      ];

    default:
      break;
  }
  return "Error! Something doesn't work";
};

export default actionAST;
