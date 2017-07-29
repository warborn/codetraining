import Router from './Router';
import ChallengeForm from './ChallengeForm';
import Progressbar from './Progressbar';
import Notifier from './Notifier';
import { createChallenge, updateChallenge, deleteChallenge, 
  getChallengeExample } from 'helpers/api';
import { PROGRESSBAR_DELAY, PROGRESSBAR_STEP, 
  CHALLENGE_MANAGER_REDIRECT_TIME } from 'config/constants';

class ChallengeManager {
  constructor(options) {
    this._action = 'post'; // default action
    this._saveBtn = $(options.selectors.save);
    this._insertBtn = $(options.selectors.insert);
    this._resetBtn = $(options.selectors.reset);
    this._deleteBtn = $(options.selectors.delete);
    this._form = new ChallengeForm(options.selectors.root, options.editors);

    // Setup event handlers
    this._onSave();
    this._onReset();
    this._onDelete();
    this._onInsertExample();
    this._action = this._form.getAction();
  }

  _onSave() {
    this._saveBtn.click((e) => {
      e.preventDefault();
      let data = this._form.getData();

      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();

      const challengePromise = this._action === 'post' ? createChallenge(data) : updateChallenge(data);
      challengePromise
      .then((translation) => {
        progressbar.finished();
        if (this._action === 'post') {
          Notifier.success('Se guardó correctamente', 'Ahora puedes editar tu reto!');
          this._redirect(() => {
            this._action = 'patch';
            Router.redirectTo(Router.edit_challenge_path(translation.challenge.id, translation.language));
          });
        } else {
          Notifier.success('Se editó correctamente', 'Se han guardado tus cambios!');
        }
      })
      .catch((error) => {
        console.error(error);
        Notifier.fromErrors('No se pudo guardar', error.response.data.errors);
        progressbar.finished();
      });
    });
  }

  _onReset() {
    this._resetBtn.click((e) => {
      e.preventDefault();
      this._form.reset();
    });
  }

  _onDelete() {
    this._deleteBtn.click((e) => {
      e.preventDefault();
      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();

      deleteChallenge()
      .then((response) => {
        progressbar.finished();
        if (this._action === 'patch') {
          Notifier.success('Se eliminó correctamente', 'Puedes crear un nuevo ejercico ahora!');
          this._redirect(() => {
            this._action = 'post';
            Router.redirectTo(Router.new_challenge_path());
          });
        }
      })
      .catch((error) => {
        progressbar.finished();
        console.error(error.response);
      });
    });
  }

  _onInsertExample() {
    this._insertBtn.click(() => {
      getChallengeExample()
      .then((response) => {
        const example = response.data;
        this._form.initialSolutionEditor.setValue(example.setup);
        this._form.completeSolutionEditor.setValue(example.answer);
        this._form.finalTestEditor.setValue(example.fixture);
      });
    });
  }

  _redirect(callback) {
    setTimeout(callback, CHALLENGE_MANAGER_REDIRECT_TIME);
  }
}

export default ChallengeManager;