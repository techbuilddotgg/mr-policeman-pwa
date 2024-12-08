import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ControlsService } from '../services/controls.service';
import { db } from '../common/database/db';
import { controls } from '../common/database/tables';

vi.mock('../common/database/db', () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ControlsService', () => {
  let controlsService: ControlsService;

  beforeEach(() => {
    controlsService = new ControlsService();
  });

  it('should create a control', async () => {
    const mockControl = {
      id: '1',
      name: 'Control 1',
      latitude: '34.0522',
      longitude: '-118.2437',
      description: 'Test description',
      upVotes: 0,
      downVotes: 0,
      createdAt: new Date(),
    };

    db.insert = vi.fn().mockReturnValueOnce({
      values: vi.fn().mockReturnValueOnce({
        returning: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce([mockControl]),
        }),
      }),
    });

    const result = await controlsService.createControl(mockControl);
    expect(result).toEqual(mockControl);
    expect(db.insert).toHaveBeenCalledWith(controls);
  });

  it('should get a control by id', async () => {
    const mockControl = {
      id: '1',
      name: 'Control 1',
      latitude: '34.0522',
      longitude: '-118.2437',
      description: 'Test description',
      upVotes: 0,
      downVotes: 0,
      createdAt: new Date(),
    };

    db.select = vi.fn().mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce([mockControl]),
        }),
      }),
    });

    const result = await controlsService.getControlById('1');
    expect(result).toEqual(mockControl);
    expect(db.select).toHaveBeenCalled();
  });

  it('should get all controls', async () => {
    const mockControls = [
      {
        id: '1',
        name: 'Control 1',
        latitude: '34.0522',
        longitude: '-118.2437',
        description: 'Test description',
        upVotes: 0,
        downVotes: 0,
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Control 2',
        latitude: '34.0522',
        longitude: '-118.2437',
        description: 'Test description',
        upVotes: 0,
        downVotes: 0,
        createdAt: new Date(),
      },
    ];

    db.select = vi.fn().mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        execute: vi.fn().mockResolvedValueOnce(mockControls),
      }),
    });

    const result = await controlsService.getControls();
    expect(result).toEqual(mockControls);
    expect(db.select).toHaveBeenCalled();
  });

  it('should delete a control', async () => {
    const controlId = '1';

    db.delete = vi.fn().mockReturnValueOnce({
      where: vi.fn().mockReturnValueOnce({
        execute: vi.fn().mockResolvedValueOnce(undefined),
      }),
    });

    await controlsService.deleteControl(controlId);
    expect(db.delete).toHaveBeenCalledWith(controls);
  });

  it('should upvote a control', async () => {
    const mockControl = {
      id: '1',
      name: 'Control 1',
      latitude: '34.0522',
      longitude: '-118.2437',
      description: 'Test description',
      upVotes: 0,
      downVotes: 0,
      createdAt: new Date(),
    };

    db.select = vi.fn().mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce([mockControl]),
        }),
      }),
    });

    db.update = vi.fn().mockReturnValueOnce({
      set: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce(undefined),
        }),
      }),
    });

    await controlsService.upVoteControl('1');

    expect(db.select).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalledWith(controls);
  });

  it('should downvote a control', async () => {
    const mockControl = {
      id: '1',
      name: 'Control 1',
      latitude: '34.0522',
      longitude: '-118.2437',
      description: 'Test description',
      upVotes: 0,
      downVotes: 0,
      createdAt: new Date(),
    };

    db.select = vi.fn().mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce([mockControl]),
        }),
      }),
    });

    db.update = vi.fn().mockReturnValueOnce({
      set: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          execute: vi.fn().mockResolvedValueOnce(undefined),
        }),
      }),
    });

    await controlsService.downVoteControl('1');

    expect(db.select).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalledWith(controls);
  });
});
