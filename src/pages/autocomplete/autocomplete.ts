import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AutocompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {
  private autocompleteItems:{place: string, placeId: string}[] = [];
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  placeService;
  map;
  infowindow = new google.maps.InfoWindow();

  constructor(public navCtrl: NavController, public navParams: NavParams, private zone: NgZone, public viewCtrl: ViewController) {
    // this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
    this.initMap(); 
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    // this.viewCtrl.dismiss(item.place);
    var env = this;
    this.placeService.getDetails({
          placeId: item.placeId
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var url = place.photos[0].getUrl({'maxWidth': 800, 'maxHeight': 800});
            var marker = new google.maps.Marker({
              map: env.map, 
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              this.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address + '</div>');
              this.infowindow.open(env.map, this);
            });
          }
        });
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions != null){
          predictions.forEach(function (prediction) {
          me.autocompleteItems.push({place:prediction.description, placeId:prediction.place_id});
        });
        }
      });
    });
  }

  initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        
        this.placeService = new google.maps.places.PlacesService(this.map);

        
      }

}
