// Search field controller
Ext.define('Ext.form.SearchField', {
  extend: 'Ext.form.field.Text',
  alias: 'widget.searchfield',
  inputType: 'search',
});

// Model for twitter feed loading json through url
Ext.define("Twitter", {
  extend:'Ext.data.Model',
  fields : [
    {
       name : 'text',
       mapping : 'text'
    },

    {
       name : 'createdAt',
       mapping : 'createdAt',
       type: 'date',
       dateFormat: 'u'
    },

    {
       name : 'name',
       mapping : 'user.name'
    },

    {
      name : 'profilePic',
      mapping : 'user.profileImageUrlHttps'
    },

    {
      name : 'tweetHandle',
      mapping : 'user.screenName'
    }
  ],
  proxy: {
    type:'jsonp',
    reader: {
      type: 'json',
      rootProperty: 'tweets'
    }
  }
});

// Model for Saved Tweets loading through localstorage
Ext.define("SaveFeed", {
  extend:'Ext.data.Model',
  fields : [
    {
      name : 'text',
    },

    {
      name : 'createdAt',
    },

    {
      name : 'name',
    },

    {
      name : 'profilePic',
    },

    {
      name : 'tweetHandle',
    }
  ],
  proxy: {
    type: 'localstorage'
  }
});
