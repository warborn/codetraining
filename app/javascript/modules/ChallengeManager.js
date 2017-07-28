import axios from 'axios';
import Router from './Router';
import ChallengeForm from './ChallengeForm';
import Progressbar from './Progressbar';
import Notifier from './Notifier';
import { 
  PROGRESSBAR_DELAY, PROGRESSBAR_STEP, CHALLENGE_MANAGER_REDIRECT_TIME
} from 'config/constants';

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
      let saveURL = Router.save_challenge_path(this.action);

      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();
      axios[this.action](saveURL, {
        challenge: data
      }, { responseType: 'json' })
      .then((response) => {
        let translation = response.data;
        progressbar.finished();
        if (this.action === 'post') {
          Notifier.success('Se guardó correctamente', 'Ahora puedes editar tu reto!');
          setTimeout(() => {
            this.action = 'patch';
            Router.redirectTo(Router.edit_challenge_path(translation.challenge.id, translation.language));
          }, CHALLENGE_MANAGER_REDIRECT_TIME);
        } else {
          Notifier.success('Se editó correctamente', 'Se han guardado tus cambios!');
        }
      })
      .catch((error) => {
        console.log(error);
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
      let deleteURL = Router.delete_challenge_path();
      let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
      progressbar.start();
      axios.delete(deleteURL, {}, 
        { responseType: 'json' })
      .then((response) => {
        progressbar.finished();
        if (this.action === 'patch') {
          Notifier.success('Se eliminó correctamente', 'Puedes crear un nuevo ejercico ahora!');
          setTimeout(() => {
            this.action = 'post';
            Router.redirectTo(Router.new_challenge_path());
          }, CHALLENGE_MANAGER_REDIRECT_TIME);
        }
      })
      .catch((error) => {
        progressbar.finished();
        console.log(error.response);
      });
    });
  }

  onInsertExample() {
    this.insertBtn.click(() => {
      axios.get(Router.example_path(), {}, { responseType: 'json' })
      .then((response) => {
        const example = response.data;
        this.form.initialSolutionEditor.setValue(example.setup);
        this.form.completeSolutionEditor.setValue(example.answer);
        this.form.finalTestEditor.setValue(example.fixture);
      });
    });
  }
}

export default ChallengeManager;