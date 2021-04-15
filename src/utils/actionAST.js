const actionAST = (type, props) => {
  // this function collects a ready-made array from the received data to add it to the ast tree
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
      return [
        props.parent,
        {
          type,
          message: `Property '${props.path.concat(
            props.parent,
          )}' was added with value: ${
            Array.isArray(props.value1)
              ? '[complex value]'
              : typeof props.value1 === 'string'
              ? `'${props.value1}'`
              : props.value1
          }`,
          value: props.value1,
        },
      ];

    case 'updated':
      return [
        props.parent,
        {
          type,
          message: `Property '${props.path.concat(
            props.parent,
          )}' was updated. From ${
            Array.isArray(props.value1)
              ? '[complex value]'
              : typeof props.value1 === 'string'
              ? `'${props.value1}'`
              : props.value1
          } to ${
            Array.isArray(props.value2)
              ? '[complex value]'
              : typeof props.value2 === 'string'
              ? `'${props.value2}'`
              : props.value2
          }`,
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
