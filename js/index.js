const colorArray = ["#FA8334", "#440381", "#A3CE37", "#388697", "#271033", "#D8D145", "#66bbca", "#DA3E52", "#E58C8A"];
const text = "";
let power = false;
const inactiveStyle = { border: "2px solid rgba(156,0,76,0.4)" };
const activeStyle = { border: "3px solid rgba(156,0,76,0.9)" };
const bankOne = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



const bankTwo = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
{
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
{
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
{
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
{
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
{
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
{
  keyCode: 90,
  keyTrigger: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
{
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
{
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }];


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataToDisplay: "Loading Preset...",
      powerButtonState: false,
      selectedBank: bankOne };


    this.drumOnOff = this.drumOnOff.bind(this);
    this.displayText = this.displayText.bind(this);
    this.selectBank = this.selectBank.bind(this);
  }


  drumOnOff(powerValue) {
    this.setState({ powerButtonState: powerValue });

  }
  displayText(buttonPressed) {
    this.setState({ dataToDisplay: buttonPressed });
  }

  selectBank(bank) {


    if (bank === "bank1")
    {this.setState({ selectedBank: bankOne });
      console.log(this.state.selectedBank);
    } else
    {
      this.setState({ selectedBank: bankTwo });
      console.log(this.state.selectedBank);
    }


  }
  render() {

    return React.createElement("div", { className: "container" },
    React.createElement("div", { class: "row " },
    React.createElement("div", { id: "drum-machine", class: "col-8 " },
    React.createElement("div", { class: "row " },
    React.createElement("div", { class: "col" },
    React.createElement("h2", { class: "brand" }, " DRUMMACHINE RSF-12")),

    React.createElement("div", { class: "col text-right" },
    React.createElement(Power, { drumOnOff: this.drumOnOff }))),



    React.createElement("div", { class: "row " },
    React.createElement("div", { class: "col-sm-6 touchpad " },
    React.createElement(Touchpad, { buttonPressed: this.displayText, padState: this.state.powerButtonState, bank: this.state.selectedBank })),

    React.createElement("div", { class: "col-sm-6 screen-controller" },
    React.createElement(Display, { dataToDisplay: this.state.dataToDisplay, screenState: this.state.powerButtonState }),
    React.createElement(Volume, { displayText: this.displayText }),
    React.createElement(SoundBank, { screenState: this.state.powerButtonState, bank: this.selectBank }))))));








  }}
;

class Touchpad extends React.Component {
  constructor(props) {
    super(props);

    this.playSound = this.playSound.bind(this);
    this.keypress = this.keypress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keypress);

  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keypress);
  }

  keypress(event) {
    for (let i = 0; i < this.props.bank.length; i++) {
      if (this.props.bank[i]["keyCode"] == event.keyCode) {
        this.props.buttonPressed(this.props.bank[i]["id"]);
        document.getElementById(this.props.bank[i]["keyTrigger"]).play();
      }
    }

  }

  playSound(event) {
    let idName = event.target.innerText;
    this.props.buttonPressed(event.target.id);
    document.getElementById(idName).play();

  }

  render() {

    const renderButtonInactive = this.props.bank.map(current => {return React.createElement("button", { type: "button", id: current["id"], className: "btn btn-secondary drum-pad disabled" }, current["keyTrigger"]);});

    const renderButtonActive = this.props.bank.map(current => {return React.createElement("button", { type: "button", id: current["id"], className: "btn btn-secondary drum-pad", onClick: this.playSound }, current["keyTrigger"],

      React.createElement("audio", { id: current["keyTrigger"], className: "clip", src: current["url"] }));


    });


    if (this.props.padState) {
      return React.createElement("div", { id: "pad" },
      renderButtonActive);

    } else {
      return React.createElement("div", { id: "pad" },
      renderButtonInactive);

    }

  }}
;

class Power extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: inactiveStyle };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    power = !power;
    this.props.drumOnOff(power);
    if (power) {
      this.setState({ style: activeStyle });
    } else
    {
      this.setState({ style: inactiveStyle });
    }
  }
  render() {
    return React.createElement("span", null, "  ", React.createElement("button", { id: "power_btn", onClick: this.handleClick, style: this.state.style }));



  }}

;

const Display = props => {

  if (props.screenState) {
    return React.createElement("div", { id: "display" },
    React.createElement("p", { className: "dataOnScreen" }, " ", props.dataToDisplay, " "));
  } else
  {
    return React.createElement("div", { id: "display" });
  }
};

class Volume extends React.Component {
  constructor(props) {
    super(props);
    this.state = { audioList: document.getElementsByClassName('clip') };
    this.handleMove = this.handleMove.bind(this);
  }

  handleMove(event) {

    for (let i = 0; i < this.state.audioList.length; i++) {
      this.state.audioList[i].volume = document.getElementById("formControlRange").value / 100;
      this.props.displayText("Volume : " + document.getElementById("formControlRange").value + "%");
    }

  }
  render() {

    return React.createElement("div", { id: "volume" },
    React.createElement("input", { type: "range", className: "form-control-range", id: "formControlRange", min: "0", max: "100", step: "1", onChange: this.handleMove }));

  }}

;

class SoundBank extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedBank: "bank1" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ selectedBank: event.target.value });
    this.props.bank(event.target.value);
  }
  render() {

    if (this.props.screenState) {
      return React.createElement("select", { id: "dropdownMenuButton", class: "form-control ", value: this.state.selectedBank, onChange: this.handleChange },
      React.createElement("option", { value: "bank1" }, "-- Bank 1 --"),
      React.createElement("option", { value: "bank2" }, "-- Bank 2 --"));



    } else
    {
      return React.createElement("select", { id: "dropdownMenuButton", class: "form-control ", disabled: true });
    }


  }}
;



ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById("root"));