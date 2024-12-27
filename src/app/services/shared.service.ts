import { Injectable } from '@angular/core';
// import '../../../../assets/jsons/district.json';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  commonList: any[] = []
  governmentChk: Boolean = false;
  fullyAidedChk: Boolean = false;
  partiallyAidedChk: boolean = false
  unAidedChk: boolean = false
  centralGovtChk: boolean = false
  stateChk: boolean = false

  primarySchoolChk: boolean = false;
  middleSchoolChk: boolean = false;
  highSchoolChk: boolean = false;
  highSecSchoolChk: boolean = false;

  allMangeIdChk: Boolean = false;
  corpSchoolChk: Boolean = false;
  municipalSchoolChk: Boolean = false;
  adiDravidaChk: Boolean = false;
  forestDeptSchlChk: Boolean = false;
  DAWDSChk: Boolean = false;
  kallarDeptChk: Boolean = false;
  tribalWelChk: Boolean = false;
  borstalSchoolChk: Boolean = false;
  KGBVChk: Boolean = false;
  NSCBAVChk: Boolean = false;
  OPASSChk: Boolean = false;
  OFAASChk: Boolean = false;
  AIFASChk: Boolean = false;
  AIPASChk: Boolean = false;
  DAWDChk: Boolean = false;

  class1: boolean = false
  class2: boolean = false
  class3: boolean = false
  class4: boolean = false
  class5: boolean = false
  class6: boolean = false
  class7: boolean = false
  class8: boolean = false
  class9: boolean = false
  class10: boolean = false
  class11: boolean = false
  class12: boolean = false

  event1: boolean = false
  event2: boolean = false
  event3: boolean = false
  event4: boolean = false
  event5: boolean = false


  data: any;
  urlData: any;
  getIndexDBValue: any;
  selectedSchoolFilter: any[] = [];
  selectedCattyFilter: any[] = [];
  selectedManageFilter: any[] = [];
  selectedGenderFilter: any[] = [];
  selectedComunityFilter: any[] = [];
  selectedClassFilter: any[] = [];
  showSportsEventFilter: any[] = [];
  healtlhHighData: any;
  constructor(private commonservice:CommonService ) { }

  //  Common Filter for school Type , Management Type and Category Type
  CalculateTotalBasedOnFilter(data, filters) {
    this.data = []
    this.commonList = [];
    this.selectedSchoolFilter = [];
    this.selectedCattyFilter = [];
    this.selectedManageFilter = [];
    this.selectedGenderFilter = [];
    this.selectedComunityFilter = [];
    this.selectedClassFilter = [];
    this.showSportsEventFilter = [];
    this.data = cloneDeep(data);
    if (filters.governmentChk) this.selectedSchoolFilter.push('1');
    if (filters.fullyAidedChk) {
      this.selectedSchoolFilter.push('2');
      this.selectedManageFilter.push('13'); // Fully Aided School
      // this.selectedManageFilter.push('19'); // Oriental (Fully Aided) Arabic School
      // this.selectedManageFilter.push('15'); // Anglo Indian (Fully Aided) School
      // this.selectedManageFilter.push('21'); // Differently Abled Welfare Department Aided School
    } 
    if (filters.partiallyAidedChk){
      this.selectedSchoolFilter.push('4');
      this.selectedManageFilter.push('14'); // Partly Aided School
      // this.selectedManageFilter.push('18'); // Oriental (Partly Aided) Sanskrit School
      // this.selectedManageFilter.push('16'); // Anglo Indian (Partly Aided) School
    }     
    if (filters.stateChk) this.selectedSchoolFilter.push('0');

    if (filters.primarySchoolChk) this.selectedCattyFilter.push('2');
    if (filters.middleSchoolChk) this.selectedCattyFilter.push('3');
    if (filters.highSchoolChk) this.selectedCattyFilter.push('4');
    if (filters.highSecSchoolChk) this.selectedCattyFilter.push('5');

    if (filters.allMangeIdChk) {
      this.selectedManageFilter = ['1', '2', '3', '4', '5', '6', '7', '9', '31', '32', '36', '13', '14'];
    }
    else {
      if (filters.schlDepMangeIdChk) this.selectedManageFilter.push('1');
      if (filters.corpSchoolChk) this.selectedManageFilter.push('2');
      if (filters.municipalSchoolChk) this.selectedManageFilter.push('3');
      if (filters.adiDravidaChk) this.selectedManageFilter.push('4');
      if (filters.forestDeptSchlChk) this.selectedManageFilter.push('5');
      if (filters.DAWDSChk) this.selectedManageFilter.push('6');
      if (filters.kallarDeptChk) this.selectedManageFilter.push('7');
      if (filters.tribalWelChk) this.selectedManageFilter.push('9');
      if (filters.borstalSchoolChk) this.selectedManageFilter.push('31');
      if (filters.KGBVChk) this.selectedManageFilter.push('32');
      if (filters.NSCBAVChk) this.selectedManageFilter.push('36');
    }

    if (filters.OPASSChk) this.selectedManageFilter.push('18');
    if (filters.OFAASChk) this.selectedManageFilter.push('19');
    if (filters.AIFASChk) this.selectedManageFilter.push('15');
    if (filters.AIPASChk) this.selectedManageFilter.push('16');
    if (filters.DAWDChk) this.selectedManageFilter.push('21');

    if (filters.centralGovtChk) {
      this.selectedSchoolFilter.push('5');
      this.selectedManageFilter.push('11');
      this.selectedManageFilter.push('12');
      this.selectedManageFilter.push('28');
      this.selectedManageFilter.push('30');
      this.selectedManageFilter.push('33');
      this.selectedManageFilter.push('34');
    }
    if (filters.unAidedChk) {
      this.selectedSchoolFilter.push('3');
      this.selectedManageFilter.push('22');
      this.selectedManageFilter.push('23');
      this.selectedManageFilter.push('24');
      this.selectedManageFilter.push('25');
      this.selectedManageFilter.push('29');
      this.selectedManageFilter.push('35');

    }

    if (filters.male) this.selectedGenderFilter.push('1');
    if (filters.female) this.selectedGenderFilter.push('2');

    if (filters.bcOthers) this.selectedComunityFilter.push('C1');
    if (filters.bcMuslim) this.selectedComunityFilter.push('C2');
    if (filters.mbc) this.selectedComunityFilter.push('C3');
    if (filters.st) this.selectedComunityFilter.push('C4');
    if (filters.scOthers) this.selectedComunityFilter.push('C5');
    if (filters.SCArunthathiyar) this.selectedComunityFilter.push('C6');
    if (filters.oc) this.selectedComunityFilter.push('C7');
    if (filters.dnc) this.selectedComunityFilter.push('C8');
    if (filters.socialCategory) this.selectedComunityFilter.push('C9');

    if (filters.class1) this.selectedClassFilter.push('1');
    if (filters.class2) this.selectedClassFilter.push('2');
    if (filters.class3) this.selectedClassFilter.push('3');
    if (filters.class4) this.selectedClassFilter.push('4');
    if (filters.class5) this.selectedClassFilter.push('5');
    if (filters.class6) this.selectedClassFilter.push('6');
    if (filters.class7) this.selectedClassFilter.push('7');
    if (filters.class8) this.selectedClassFilter.push('8');
    if (filters.class9) this.selectedClassFilter.push('9');
    if (filters.class10) this.selectedClassFilter.push('10');
    if (filters.class11) this.selectedClassFilter.push('11');
    if (filters.class12) this.selectedClassFilter.push('12');

    if (filters.event1) this.showSportsEventFilter.push('1');
    if (filters.event2) this.showSportsEventFilter.push('2');
    if (filters.event3) this.showSportsEventFilter.push('3');
    if (filters.event4) this.showSportsEventFilter.push('4');
    if (filters.event5) this.showSportsEventFilter.push('5');


    //Class Filter
    if (filters.showFilters.includes('6') || filters.showFilters.includes('C6') || filters.showFilters.includes('C7')) {
      if (this.selectedClassFilter.length == 0) {
        this.commonList = [];
      }
      else if (this.selectedClassFilter.length == 12) {
        this.commonList = this.data;
      }
      else {
        for (let i = 0; i < this.selectedClassFilter.length; i++) {
          var resultClass = this.data.filter(x => x.class_studying_id == this.selectedClassFilter[i]);
          this.commonList = [...this.commonList, ...resultClass];
        }
      }
    }
    else {
      this.commonList = this.data;
    }

    //Community Filter
    var afterClassFilt = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('5')) {
      if (this.selectedComunityFilter.length == 0) {
        this.commonList = [];
      }
      else if (this.selectedComunityFilter.length == 9) {
        this.commonList = afterClassFilt;
      }
      else {
        for (let i = 0; i < this.selectedComunityFilter.length; i++) {
          var resultc = afterClassFilt.filter(x => x.community_code == this.selectedComunityFilter[i]);
          this.commonList = [...this.commonList, ...resultc];
        }
      }
    }
    else {
      this.commonList = afterClassFilt;
    }

    //Gender Filter
    var afterComunityFilt = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('4')) {
      if (this.selectedGenderFilter.length == 2) {
        this.commonList = afterComunityFilt;
      }
      else if (this.selectedGenderFilter.length == 0) {
        this.commonList = [];
      }
      else {
        for (let i = 0; i < this.selectedGenderFilter.length; i++) {
          var resultg = afterComunityFilt.filter(x => x.gender == this.selectedGenderFilter[i]);
          this.commonList = [...this.commonList, ...resultg];
        }
      }
    }
    else {
      this.commonList = afterComunityFilt;
    }

    //School Type Filter
    var afterGenderFilt = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('1') || filters.showFilters.includes('R7') || filters.showFilters.includes('S1')) {
      if (this.selectedSchoolFilter.length > 0) {
        for (let i = 0; i < this.selectedSchoolFilter.length; i++) {
          var result = afterGenderFilt.filter(x => x.school_type_id == this.selectedSchoolFilter[i]);
          this.commonList = [...this.commonList, ...result];
        }
        console.log(this.commonList, 'service');

      }
      else {
        this.commonList = [];
      }
    }
    else {
      this.commonList = afterGenderFilt
    }

    //Category Filter
    var afterSchoolTypeFilter = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('3')) {
      if (this.selectedCattyFilter.length > 0) {
        for (let i = 0; i < this.selectedCattyFilter.length; i++) {
          var result1 = afterSchoolTypeFilter.filter(x => x.catty_id == this.selectedCattyFilter[i]);
          this.commonList = [...this.commonList, ...result1];
        }
      }
      else {
        this.commonList = [];
      }
    }
    else {
      this.commonList = afterSchoolTypeFilter;
    }

    //Management Filter
    var afterCateFilter = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('2') || filters.showFilters.includes('A2')) {
      if (this.selectedManageFilter.length > 0) {
        for (let i = 0; i < this.selectedManageFilter.length; i++) {
          var result2 = afterCateFilter.filter(x => x.manage_id == this.selectedManageFilter[i]);
          this.commonList = [...this.commonList, ...result2];
        }
      }
      else {
        this.commonList = [];
      }
    }
    else {
      this.commonList = afterCateFilter;
    }

    //Event Filter
    var afterManageFilter = this.commonList;
    this.commonList = [];
    if (filters.showFilters.includes('7')) {
      if (this.showSportsEventFilter.length > 0) {
        for (let i = 0; i < this.showSportsEventFilter.length; i++) {
          var result3 = afterManageFilter.filter(x => x.event_id == this.showSportsEventFilter[i]);
          this.commonList = [...this.commonList, ...result3];
        }
      }
      else {
        this.commonList = [];
      }
    }
    else {
      this.commonList = afterManageFilter;
    }


    console.log(this.commonList, 'return');

    return this.commonList;



  }

  // Check the Json Exists in Index DB
  CheckDataInIndexDb(keyName) {
    this.commonservice.get(keyName).then(res => {
      return res
    })
  }

  //Delete the Json in Index DB
  deleteIndexedDbjson(name) {
    this.commonservice.delete(name).then(res => {
      return res
    })
  }


  // Add the Json  in Index DB
  addDataToIndexDB(keyName, data) {
    this.commonservice.add(keyName, data).then(res => {
      if (res) {
        return res
      }
    })
  }
  // get the Json  in Index DB
  getIndexedDbjson(name) {
    this.commonservice.get(name).then(res => {
      this.setIndexDB(res)
    })
  }
  setIndexDB(res) {
    this.getIndexDBValue = res
  }

  getIndexDB() {
    return this.getIndexDBValue;
  }
  //  formmaring the Json
  dataFormat(data, column) {
    var datas = []
    let keys = Object.values(column);
    for (let i in data) {
      let s = data[i];
      let result = {};
      keys.forEach((key: any, idx) => result[key] = s[idx]);
      datas.push(result);

    }
    return datas

  }


  // Return the Mamnement Values
  getMngTypeOnUserType(usertype, usertype1) {
    if ((usertype == 15 && usertype1 == 3) || (usertype == 15 && usertype1 == 4) || (usertype == 15 && usertype1 == 5)
      || (usertype == 15 && usertype1 == 6) || (usertype == 15 && usertype1 == 7)) {
      if (usertype1 == 3) {
        return 4
      }
      else if (usertype1 == 4) {
        return 9
      }
      else if (usertype1 == 5) {
        return [32,36]
      }
      else if (usertype1 == 6) {
        return 5
      }
      else if (usertype1 == 7) {
        return 7
      }
    }
    //State PMU's
    else if (usertype == 5 || usertype == 15 || usertype == 13 || usertype == 44 || usertype == 40 || (usertype == 51 && usertype1 == 0)) {
      return "state"
    }
    //District logins
    else if (usertype == 19 || usertype == 9 || usertype == 24 || usertype == 43 || usertype == 3 || usertype == 37 || usertype == 23) {
      return "district"
    }
    //Education District
    else if (usertype == 36 || usertype == 37 || usertype == 38) {
      return "edu_district"
    }
    //block logins
    else if (usertype == 6 || usertype == 2 || usertype == 39) {
      return "block"
    }
  }

  // Common function for get the districts from the json
  fetchDistricts() {
    fetch('../../../../assets/jsons/district.json').then(res => res.json()).then(data => {
      return data
    });
  }

  // tab change event
  tabChange(event) {
    var index = event.index;
    return index
  }


  // Perform Sum Calculation
  calculateSum(array, property) {
    const total = array.reduce((accumulator, object) => {
      return accumulator + Number(object[property]);
    }, 0);
    return total;
  }

  // getting the Date Before 10 days
  beforeDays(days) {
    var start = new Date()
    start.setDate(start.getDate() - days);
    var end = new Date()
    end.setDate(end.getDate() - 1);
    var rangevalues = [start, end]
    return rangevalues
  }


  getDate(value) {
    var newDate = new Date();
    // 0 = CurrentDate
    // 1 = Mindate
    // 2 = maxDate
    if (value == "0") {
      var currentDateValue = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 20, 0);
      return currentDateValue
    }
    else if (value == "1") {
      var minDateValue = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 60, 0);
      return minDateValue
    }
    else if (value == "2") {
      var maxDateValue = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1, 0);
      return maxDateValue
    }
  }

  //get array of date ranges
  testdiff(from, to) {
    var resultat: any = [];
    while (from <= to) {
      var dd = from.getDate();
      var mm = from.getMonth() + 1;
      var yyyy = from.getFullYear();
      if (dd < 10) { dd = '0' + dd; }
      if (mm < 10) { mm = '0' + mm; }
      var vDate = yyyy + '-' + mm + '-' + dd;
      resultat.push(vDate);
      from = new Date(from.setDate(from.getDate() + 1));
    }

    return resultat;

  }

  //date range filter

  dateFilter(allData, dateArray, columnName) {
    debugger
    var finalArr = [];
    for (let i = 0; i < dateArray.length; i++) {
      var result = allData.filter(x => (x[columnName] == dateArray[i]));
      finalArr = [...finalArr, ...result];
    }

    return finalArr;
  }

  getFooter(e, array) {
    var footerArray = []
    var newObj = {};
    var TotalValue: number = 0
    var footercols = e.sort(function (a, b) {
      return a.id - b.id
    });
    
    for (var i = 0; i < footercols.length; i++) {
      newObj[e[i].field] = "";
    }
    footerArray.push(newObj)
    var sortByType = e.sort(function (a, b) {
      return a.type - b.type
    });
    sortByType.forEach(element => {
      var field, value
      if (element.type == 1 || element.type == 2) {
        if (element.type == 1) {
          field = element.field
          value = array.map(e => e[field] == '' ? 0 : Number(e[field])).reduce((sum, current) => sum + current);
          footerArray.forEach(x =>
            x[field] = value
          )
          TotalValue += +value.toFixed(1);
        }
        else {
          field = element.field
          footerArray.forEach(x =>
            x[field] = TotalValue.toFixed(1)
          )
        }
      }
      else if (element.type == 3) {

        var field1 = element.percent
        var field = element.field
        value = array.map(e => e[field1] == '' ? 0 : Number(e[field1])).reduce((sum, current) => sum + current);
        var per = ((value / footerArray[0].Total) * 100).toFixed(1);
        footerArray.forEach(x =>
          x[field] = per
        )
      }
      else if (element.type == 0) {
        field = element.field
        value = element.percent;
        footerArray.forEach(x =>
          x[field] = value
        )

      }
    });
    for (let [key, value] of Object.entries(footerArray[0])) {
      if (value) {
        let val: any = value;
        if (key.search('Per') == -1) {
          footerArray[0][key] = parseInt(val).toFixed(0)
        }
      }
    }
    var sortByType = e.sort(function (a, b) {
      return a.id - b.id
    });

    return footerArray;
  }


  
  



}
