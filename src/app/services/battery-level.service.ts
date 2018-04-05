import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@Injectable()
export class BatteryLevelService {
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = '00000006-0000-3512-2118-0009af100700';
  static GATT_PRIMARY_SERVICE = '0000fee0-0000-1000-8000-00805f9b34fb';

  static GATT_NOTIFICATION_SERVICE = '00001802-0000-1000-8000-00805f9b34fb';
  static GATT_NOTIFICATION_CHARACTERISTIC = '00002a06-0000-1000-8000-00805f9b34fb';
  static GATT_NOTIFICATION_VALUE = new Uint8Array([2]);

  static GATT_HEARTRATE_SERVICE = '0000180d-0000-1000-8000-00805f9b34fb';
  static GATT_HEARTRATE_CHARACTERISTIC_WRITE = '00002a39-0000-1000-8000-00805f9b34fb';
  static GATT_HEARTRATE_VALUE = new Uint8Array([21,2,1]);
  static GATT_HEARTRATE_CHARACTERISTIC_NOTIFY = '00002a37-0000-1000-8000-00805f9b34fb';

  constructor(public ble: BluetoothCore) {}

  getFakeValue() {
    this.ble.fakeNext();
  }

  getDevice() {
    return this.ble.getDevice$();
  }

  streamValues() {
    return this.ble.streamValues$().map((value: DataView) => value.getUint8(0));
  }

  /**
   * Get Battery Level GATT Characteristic value.
   * This logic is specific to this service, this is why we can't abstract it elsewhere.
   * The developer is free to provide any service, and characteristics she wants.
   *
   * @return {Observable<Number>} Emites the value of the requested service read from the device
   */
  getBatteryLevel() {
    console.log('Getting Battery Service...');

    try {
      return this.ble
        .discover$({
          acceptAllDevices: true,
          optionalServices: [BatteryLevelService.GATT_PRIMARY_SERVICE]
        })
        .mergeMap((gatt: BluetoothRemoteGATTServer) => {
          return this.ble.getPrimaryService$(
            gatt,
            BatteryLevelService.GATT_PRIMARY_SERVICE
          );
        })
        .mergeMap((primaryService: BluetoothRemoteGATTService) => {
          return this.ble.getCharacteristic$(
            primaryService,
            BatteryLevelService.GATT_CHARACTERISTIC_BATTERY_LEVEL
          );
        })
        .mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
          return this.ble.readValue$(characteristic);
        })
        .map((value: DataView) => value.getUint8(0));
    } catch (e) {
      console.error('Oops! can not read value from %s');
    }
  }

  startNotification() {
    this.startWrite(BatteryLevelService.GATT_NOTIFICATION_SERVICE,
                     BatteryLevelService.GATT_NOTIFICATION_CHARACTERISTIC,
                      BatteryLevelService.GATT_NOTIFICATION_VALUE);
  }

  startHeartrateMeasurement() {
      this.startWrite(BatteryLevelService.GATT_HEARTRATE_SERVICE,
                       BatteryLevelService.GATT_HEARTRATE_CHARACTERISTIC_WRITE,
                        BatteryLevelService.GATT_HEARTRATE_VALUE);
  }

  startWrite(serviceUUID, characteristicUUID, valueToWrite) {
    console.log('Getting Battery Service...');
    
        try {
          this.ble
            .discover$({
              acceptAllDevices: true,
              optionalServices: [serviceUUID]
            })
            .mergeMap((gatt: BluetoothRemoteGATTServer) => {
              return this.ble.getPrimaryService$(
                gatt,
                serviceUUID
              );
            })
            .mergeMap((primaryService: BluetoothRemoteGATTService) => {
              return this.ble.getCharacteristic$(
                primaryService,
                characteristicUUID
              );
            })
            .mergeMap((characteristic: BluetoothRemoteGATTCharacteristic) => {
              return this.ble.writeValue$(characteristic, valueToWrite);
            }).subscribe();
            
        } catch (e) {
          console.error('Oops! can not read value from %s');
        }
  }
}