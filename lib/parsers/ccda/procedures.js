/*
 * Parser for the CCDA procedures section
 */

var Core = require('../../core');

module.exports = function(doc) {
  var self = this;
  self.doc = doc;

  self.procedures = function (ccda) {
    
    var parseDate = self.doc.parseDate;
    var parseName = self.doc.parseName;
    var parseAddress = self.doc.parseAddress;
    var procedures = ccda.section('procedures');
  
    var data = {}, el;
    data.entries = [];
    data.displayName = "Procedures";
    data.templateId = procedures.tag('templateId').attr('root');
    data.text = procedures.tag('text').val(true);
    
    procedures.entries().each(function(entry) {
      
      el = entry.tag('effectiveTime');
      var date = parseDate(el.attr('value'));
      
      el = entry.tag('code');
      var name = el.attr('displayName'),
          code = el.attr('code'),
          code_system = el.attr('codeSystem');
  
      if (!name) {
        name = Core.stripWhitespace(entry.tag('originalText').val());
      }
      
      // 'specimen' tag not always present
      el = entry.tag('specimen').tag('code');
      var specimen_name = el.attr('displayName'),
          specimen_code = el.attr('code'),
          specimen_code_system = el.attr('codeSystem');
      
      el = entry.tag('performer').tag('addr');
      var organization = el.tag('name').val(),
          phone = el.tag('telecom').attr('value');
      
      var performer_dict = parseAddress(el);
      performer_dict.organization = organization;
      performer_dict.phone = phone;
      
      // participant => device
      el = entry.template('2.16.840.1.113883.10.20.22.4.37').tag('code');
      var device_name = el.attr('displayName'),
          device_code = el.attr('code'),
          device_code_system = el.attr('codeSystem');
      
      data.entries.push({
        date: date,
        name: name,
        code: code,
        code_system: code_system,
        specimen: {
          name: specimen_name,
          code: specimen_code,
          code_system: specimen_code_system
        },
        performer: performer_dict,
        device: {
          name: device_name,
          code: device_code,
          code_system: device_code_system
        }
      });
    });
    
    return data;
  };
}