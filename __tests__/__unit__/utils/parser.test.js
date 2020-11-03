const logger = require('../../../src/logger');
const { parserStatus } = require('../../../src/utils/parser');

describe('test parser', () => {
  it('should return nothing', () => {
    expect(parserStatus('')).toEqual([]);
  });

  it('should return three items items of seven listed', () => {
    expect(
      parserStatus(
        ' M package-lock.json\n M package.json\n M src/cmd/DiffPrompt.js\n?? .eslintrc.json\n?? __tests__/\n?? jest.config.js\n?? src/builder/'
      )
    ).toEqual(['package-lock.json', 'package.json', 'src/cmd/DiffPrompt.js']);
  });

  it('should log an error', () => {
    const mockLogger = jest.spyOn(logger, 'error');

    parserStatus('"');

    expect(mockLogger).toHaveBeenCalled();
  });
});
