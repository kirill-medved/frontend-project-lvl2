import esprima from 'esprima';

const getSyntaxTrees = (obj1, obj2) => {
  const ast1 = esprima.parse(`const a = ${JSON.stringify(obj1)}`);
  const ast2 = esprima.parse(`const b = ${JSON.stringify(obj2)}`);
  return [
    ast1['body'][0]['declarations'][0]['init']['properties'],
    ast2['body'][0]['declarations'][0]['init']['properties'],
  ];
};

export default getSyntaxTrees;
