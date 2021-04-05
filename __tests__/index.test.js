import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import findDiff from '../src/findDiff';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

describe('test findDiff func for stylish format', () => {
  it('work correct for json files', () => {
    const path1 = getFixturePath('oldNestedStructure.json');
    const path2 = getFixturePath('newNestedStructure.json');
    expect(findDiff(path1, path2, 'stylish')).toEqual({
      '+ group3': {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
      '+ group5': {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      '- group2': {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      '- group4': {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      common: {
        '  setting1': 'Value 1',
        '+ follow': false,
        '+ setting3': null,
        '+ setting4': 'blah blah',
        '+ setting5': {
          key5: 'value5',
        },
        '- setting2': 200,
        '- setting3': true,
        setting6: {
          '  key': 'value',
          '+ ops': 'vops',
          doge: {
            '+ wow': 'so much',
            '- wow': '',
          },
        },
      },
      group1: {
        '  foo': 'bar',
        '+ baz': 'bars',
        '+ nest': 'str',
        '- baz': 'bas',
        '- nest': {
          key: 'value',
        },
      },
    });
  });

  it('work correct for yaml files', () => {
    const path1 = getFixturePath('oldNestedStructure.yaml');
    const path2 = getFixturePath('newNestedStructure.yaml');
    expect(findDiff(path1, path2, 'stylish')).toEqual({
      '+ group3': {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
      '- group2': {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
      common: {
        '  setting1': 'Value 1',
        '+ follow': false,
        '+ setting3': null,
        '+ setting4': 'blah blah',
        '+ setting5': {
          key5: 'value5',
        },
        '- setting2': 200,
        '- setting3': true,
        setting6: {
          '  key': 'value',
          '+ ops': 'vops',
          doge: {
            '+ wow': 'so much',
            '- wow': '',
          },
        },
      },
      group1: {
        '  foo': 'bar',
        '+ baz': 'bars',
        '+ nest': 'str',
        '- baz': 'bas',
        '- nest': {
          key: 'value',
        },
      },
    });
  });
});

describe('test func findDiff for plain format', () => {
  it('work correct for json files', () => {
    const path1 = getFixturePath('oldNestedStructure.json');
    const path2 = getFixturePath('newNestedStructure.json');
    expect(findDiff(path1, path2, 'plain')).toEqual(
      "Property 'common.follow' was added with value: false\n" +
        "Property 'common.setting2' was removed\n" +
        "Property 'common.setting3' was updated. From true to null\n" +
        "Property 'common.setting4' was added with value: blah blah\n" +
        "Property 'common.setting5' was added with value: [complex value]\n" +
        "Property 'common.setting6.doge.wow' was updated. From  to so much\n" +
        "Property 'common.setting6.ops' was added with value: vops\n" +
        "Property 'group1.baz' was updated. From bas to bars\n" +
        "Property 'group1.nest' was updated. From [complex value] to str\n" +
        "Property 'group2' was removed\n" +
        "Property 'group3' was added with value: [complex value]\n" +
        "Property 'group4' was removed\n" +
        "Property 'group5' was added with value: [complex value]\n",
    );
  });

  it('work correct for yaml files', () => {
    const path1 = getFixturePath('oldNestedStructure.yaml');
    const path2 = getFixturePath('newNestedStructure.yaml');
    expect(findDiff(path1, path2, 'plain')).toEqual(
      "Property 'common.follow' was added with value: false\n" +
        "Property 'common.setting2' was removed\n" +
        "Property 'common.setting3' was updated. From true to null\n" +
        "Property 'common.setting4' was added with value: blah blah\n" +
        "Property 'common.setting5' was added with value: [complex value]\n" +
        "Property 'common.setting6.doge.wow' was updated. From  to so much\n" +
        "Property 'common.setting6.ops' was added with value: vops\n" +
        "Property 'group1.baz' was updated. From bas to bars\n" +
        "Property 'group1.nest' was updated. From [complex value] to str\n" +
        "Property 'group2' was removed\n" +
        "Property 'group3' was added with value: [complex value]\n",
    );
  });
});

describe('test func findDiff for json format', () => {
  it('work correct for json files', () => {
    const path1 = getFixturePath('oldNestedStructure.json');
    const path2 = getFixturePath('newNestedStructure.json');
    expect(findDiff(path1, path2, 'json')).toEqual([
      [
        'common',
        [
          [
            'follow',
            {
              message: "Property 'common.follow' was added with value: false",
              type: 'added',
              value: false,
            },
          ],
          [
            'setting1',
            {
              message: "Property common.setting1 wasn't change",
              type: 'same',
              value: 'Value 1',
            },
          ],
          [
            'setting2',
            {
              message: "Property 'common.setting2' was removed",
              type: 'removed',
              value: 200,
            },
          ],
          [
            'setting3',
            {
              message:
                "Property 'common.setting3' was updated. From true to null",
              type: 'updated',
              value1: true,
              value2: null,
            },
          ],
          [
            'setting4',
            {
              message:
                "Property 'common.setting4' was added with value: blah blah",
              type: 'added',
              value: 'blah blah',
            },
          ],
          [
            'setting5',
            {
              message:
                "Property 'common.setting5' was added with value: [complex value]",
              type: 'added',
              value: [['key5', 'value5']],
            },
          ],
          [
            'setting6',
            [
              [
                'doge',
                [
                  [
                    'wow',
                    {
                      message:
                        "Property 'common.setting6.doge.wow' was updated. From  to so much",
                      type: 'updated',
                      value1: '',
                      value2: 'so much',
                    },
                  ],
                ],
              ],
              [
                'key',
                {
                  message: "Property common.setting6.key wasn't change",
                  type: 'same',
                  value: 'value',
                },
              ],
              [
                'ops',
                {
                  message:
                    "Property 'common.setting6.ops' was added with value: vops",
                  type: 'added',
                  value: 'vops',
                },
              ],
            ],
          ],
        ],
      ],
      [
        'group1',
        [
          [
            'baz',
            {
              message: "Property 'group1.baz' was updated. From bas to bars",
              type: 'updated',
              value1: 'bas',
              value2: 'bars',
            },
          ],
          [
            'foo',
            {
              message: "Property group1.foo wasn't change",
              type: 'same',
              value: 'bar',
            },
          ],
          [
            'nest',
            {
              message:
                "Property 'group1.nest' was updated. From [complex value] to str",
              type: 'updated',
              value1: [['key', 'value']],
              value2: 'str',
            },
          ],
        ],
      ],
      [
        'group2',
        {
          message: "Property 'group2' was removed",
          type: 'removed',
          value: [
            ['abc', 12345],
            ['deep', [['id', 45]]],
          ],
        },
      ],
      [
        'group3',
        {
          message: "Property 'group3' was added with value: [complex value]",
          type: 'added',
          value: [
            ['deep', [['id', [['number', 45]]]]],
            ['fee', 100500],
          ],
        },
      ],
      [
        'group4',
        {
          message: "Property 'group4' was removed",
          type: 'removed',
          value: [
            ['abc', 12345],
            ['deep', [['id', 45]]],
          ],
        },
      ],
      [
        'group5',
        {
          message: "Property 'group5' was added with value: [complex value]",
          type: 'added',
          value: [
            ['abc', 12345],
            ['deep', [['id', 45]]],
          ],
        },
      ],
    ]);
  });

  it('work correct for yaml files', () => {
    const path1 = getFixturePath('oldNestedStructure.yaml');
    const path2 = getFixturePath('newNestedStructure.yaml');
    expect(findDiff(path1, path2, 'json')).toEqual([
      [
        'common',
        [
          [
            'follow',
            {
              message: "Property 'common.follow' was added with value: false",
              type: 'added',
              value: false,
            },
          ],
          [
            'setting1',
            {
              message: "Property common.setting1 wasn't change",
              type: 'same',
              value: 'Value 1',
            },
          ],
          [
            'setting2',
            {
              message: "Property 'common.setting2' was removed",
              type: 'removed',
              value: 200,
            },
          ],
          [
            'setting3',
            {
              message:
                "Property 'common.setting3' was updated. From true to null",
              type: 'updated',
              value1: true,
              value2: null,
            },
          ],
          [
            'setting4',
            {
              message:
                "Property 'common.setting4' was added with value: blah blah",
              type: 'added',
              value: 'blah blah',
            },
          ],
          [
            'setting5',
            {
              message:
                "Property 'common.setting5' was added with value: [complex value]",
              type: 'added',
              value: [['key5', 'value5']],
            },
          ],
          [
            'setting6',
            [
              [
                'doge',
                [
                  [
                    'wow',
                    {
                      message:
                        "Property 'common.setting6.doge.wow' was updated. From  to so much",
                      type: 'updated',
                      value1: '',
                      value2: 'so much',
                    },
                  ],
                ],
              ],
              [
                'key',
                {
                  message: "Property common.setting6.key wasn't change",
                  type: 'same',
                  value: 'value',
                },
              ],
              [
                'ops',
                {
                  message:
                    "Property 'common.setting6.ops' was added with value: vops",
                  type: 'added',
                  value: 'vops',
                },
              ],
            ],
          ],
        ],
      ],
      [
        'group1',
        [
          [
            'baz',
            {
              message: "Property 'group1.baz' was updated. From bas to bars",
              type: 'updated',
              value1: 'bas',
              value2: 'bars',
            },
          ],
          [
            'foo',
            {
              message: "Property group1.foo wasn't change",
              type: 'same',
              value: 'bar',
            },
          ],
          [
            'nest',
            {
              message:
                "Property 'group1.nest' was updated. From [complex value] to str",
              type: 'updated',
              value1: [['key', 'value']],
              value2: 'str',
            },
          ],
        ],
      ],
      [
        'group2',
        {
          message: "Property 'group2' was removed",
          type: 'removed',
          value: [
            ['abc', 12345],
            ['deep', [['id', 45]]],
          ],
        },
      ],
      [
        'group3',
        {
          message: "Property 'group3' was added with value: [complex value]",
          type: 'added',
          value: [
            ['deep', [['id', [['number', 45]]]]],
            ['fee', 100500],
          ],
        },
      ],
    ]);
  });
});

describe('test func findDiff for', () => {
  it('uncorrect format', () => {
    const path1 = getFixturePath('oldNestedStructure.json');
    const path2 = getFixturePath('newNestedStructure.json');
    expect(findDiff(path1, path2, 'fff')).toEqual(
      new Error("This format doesn't exist"),
    );
  });

  it('uncorrect filepath', () => {
    const path1 = getFixturePath('wrongfilepath.json');
    const path2 = getFixturePath('newNestedStructure.json');
    expect(findDiff(path1, path2, 'stylish')).toEqual(
      new Error('File not found!'),
    );
  });
});
