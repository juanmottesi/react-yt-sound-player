import { useState } from 'react';
import Player from '../components/Player'

export default {
  title: 'Components/Player',
  component: Player,
}

const Template = (args) => <Player {...args} />;

export const Default = Template.bind({});
Default.args = { songs: ['oUFJJNQGwhk', 'gBrO3VGCwio'] };

export const WithoutSongs = (args) => {
  const [songs, setSongs] = useState([])
  const addSongs = () => setSongs(['oUFJJNQGwhk', 'gBrO3VGCwio'])
  const changePlaylist = () => setSongs(['gBrO3VGCwio', 'oUFJJNQGwhk'])
  return (
    <>
      <Player {...args} songs={songs} />
      <br />
      <button type="button" onClick={addSongs}>Add playlist</button>
      <button type="button" onClick={changePlaylist}>Change playlist</button>
    </>
  );
}
