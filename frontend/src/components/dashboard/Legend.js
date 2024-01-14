


import markerDeclined from '../icons/decline.png';
import markerEnCours from '../icons/encours.png';
import markerFavorable from '../icons/favorable.png';
import markerDefavorable from '../icons/defavorable.png';




const Legend = () => {
    const legendItems = [
      { status: 'Favorable', icon: markerFavorable },
      { status: 'Défavorable', icon: markerDefavorable },
      { status: 'En cours de traitement', icon: markerEnCours },
      { status: 'Dossier Rejeté', icon: markerDeclined },

    ];
  
    return (
      <div className="legend" style={{ position: 'absolute', bottom: '150px', right: '175px', backgroundColor: 'white', padding: '10px', fontSize: '25px'}}>
        <h3>Légende</h3>
        {legendItems.map((item) => (
          <div key={item.status}>
            <img src={item.icon} alt={`${item.status} marker`} style={{ width: '20px', height: '20px', marginRight: '5px' }} />
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    );
  };

  export default Legend;
  