import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Icon from '../../../../app/components/Icon';
import {
  STEP_BEFORE_CLONE,
  STEP_AFTER_CLONE,
  STEP_BEFORE_INSTALL,
  STEP_AFTER_INSTALL,
  STEP_BEFORE_ACTIVATE,
  STEP_AFTER_ACTIVATE,
  STEP_BEFORE_PURGE,
  STEP_AFTER_PURGE,
} from '../../../constants';

const Commands = (props) => {
  const {
    commands,
    project,
  } = props;

  const strings = {
    label: Lang.get('commands.label'),
    step: Lang.get('commands.step'),
    after: Lang.get('commands.after'),
    before: Lang.get('commands.before'),
    none: Lang.get('app.none'),
    configure: Lang.get('commands.configure'),
    clone: Lang.get('commands.clone'),
    install: Lang.get('commands.install'),
    activate: Lang.get('commands.activate'),
    purge: Lang.get('commands.purge'),
  };

  const commandNames = (stage) => {
    const commandList = [];
    commands.forEach((command) => {
      if (command.step === stage) {
        commandList.push(command.name);
      }
    });

    if (commandList.length > 0) {
      return commandList.join(', ');
    }

    return strings.none;
  };

  return (
    <div className="box">
      <div className="box-header">
        <h3 className="box-title">{strings.label}</h3>
      </div>
      <div className="box-body table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>{strings.step}</th>
              <th>{strings.before}</th>
              <th>{strings.after}</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{strings.clone}</td>
              <td>{commandNames(STEP_BEFORE_CLONE)}</td>
              <td>{commandNames(STEP_AFTER_CLONE)}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link
                    to={`/projects/${project.id}/commands/clone`}
                    className="btn btn-default"
                    title={strings.configure}
                  ><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.install}</td>
              <td>{commandNames(STEP_BEFORE_INSTALL)}</td>
              <td>{commandNames(STEP_AFTER_INSTALL)}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link
                    to={`/projects/${project.id}/commands/install`}
                    className="btn btn-default"
                    title={strings.configure}
                  ><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.activate}</td>
              <td>{commandNames(STEP_BEFORE_ACTIVATE)}</td>
              <td>{commandNames(STEP_AFTER_ACTIVATE)}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link
                    to={`/projects/${project.id}/commands/activate`}
                    className="btn btn-default"
                    title={strings.configure}
                  ><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
            <tr>
              <td>{strings.purge}</td>
              <td>{commandNames(STEP_BEFORE_PURGE)}</td>
              <td>{commandNames(STEP_AFTER_PURGE)}</td>
              <td>
                <div className="btn-group pull-right">
                  <Link
                    to={`/projects/${project.id}/commands/purge`}
                    className="btn btn-default"
                    title={strings.configure}
                  ><Icon fa="gear" /></Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Commands.propTypes = {
  project: PropTypes.object.isRequired,
  commands: PropTypes.array.isRequired,
};

export default Commands;

