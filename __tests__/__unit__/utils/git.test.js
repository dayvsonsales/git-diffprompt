const logger = require('../../../src/logger');
const git = require('../../../src/utils/git');
const { notStagedTracked, diffTool } = require('../../../src/utils/git');

describe('test git helper file', () => {
  it('should return not staged files', () => {
    const mockGit = jest
      .spyOn(git, 'notStagedTracked')
      .mockImplementation(() => ' M package.json');
    git.notStagedTracked();
    expect(mockGit).toHaveBeenCalled();
  });

  it('should not pass with unknown directory', () => {
    const mockLog = jest.spyOn(logger, 'error');
    notStagedTracked('unknown directory');
    expect(mockLog).toHaveBeenCalled();
  });

  it('should open difftool', () => {
    const mockGit = jest.spyOn(git, 'diffTool').mockImplementation();
    git.diffTool('file');
    git.diffTool('file', '53494abcde2');
    expect(mockGit).toHaveBeenCalledTimes(2);
  });

  it('should not pass with missing file', () => {
    const mockLog = jest.spyOn(logger, 'error');
    diffTool();
    expect(mockLog).toHaveBeenCalled();
  });
});
