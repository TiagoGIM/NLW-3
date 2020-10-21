import Orphanage from '../models/Orphanage';
import imageView from '../views/images_view';

export default {
	//Formatar o show de acordo com o que o front espera
	render(orphanage: Orphanage){
		return {
			id: orphanage.id,
			name : orphanage.name,
			opening_hours : orphanage.opening_hours,
			latitude: orphanage.latitude,
			longitude: orphanage.longitude,
			about:orphanage.about,
			instructions: orphanage.instructions,
			open_weekends: orphanage.open_weekends,
			images : imageView.renderMany(orphanage.images)
		};
	},
	renderMany(orphanages: Orphanage[]){
		return orphanages.map(orphanage => this.render(orphanage));
	}
};