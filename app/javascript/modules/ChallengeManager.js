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
    this.action = 'post'; // default action
    this.saveBtn = $(options.selectors.save);
    this.insertBtn = $(options.selectors.insert);
    this.resetBtn = $(options.selectors.reset);
    this.deleteBtn = $(options.selectors.delete);
    this.form = new ChallengeForm(options.selectors.root, options.editors);

    // Setup event handlers
    this.onSave();
    this.onReset();
    this.onDelete();
    this.onInsertExample();
    this.action = this.form.getAction();
  }

  onSave() {
    this.saveBtn.click((e) => {
      e.preventDefault();
      let data = this.form.getData();

      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();

      const challengePromise = this.action === 'post' ? createChallenge(data) : updateChallenge(data);
      challengePromise
      .then((translation) => {
        progressbar.finished();
        if (this.action === 'post') {
          Notifier.success('Se guardó correctamente', 'Ahora puedes editar tu reto!');
          this.redirect(() => {
            this.action = 'patch';
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

  onReset() {
    this.resetBtn.click((e) => {
      e.preventDefault();
      this.form.reset();
    });
  }

  onDelete() {
    this.deleteBtn.click((e) => {
      e.preventDefault();
      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();

      deleteChallenge()
      .then((response) => {
        progressbar.finished();
        if (this.action === 'patch') {
          Notifier.success('Se eliminó correctamente', 'Puedes crear un nuevo ejercico ahora!');
          this.redirect(() => {
            this.action = 'post';
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

  onInsertExample() {
    this.insertBtn.click(() => {
      getChallengeExample()
      .then((response) => {
        const example = response.data;
        this.form.initialSolutionEditor.setValue(example.setup);
        this.form.completeSolutionEditor.setValue(example.answer);
        this.form.finalTestEditor.setValue(example.fixture);
      });
    });
  }

  redirect(callback) {
    setTimeout(callback, CHALLENGE_MANAGER_REDIRECT_TIME);
  }
}

export default ChallengeManager;