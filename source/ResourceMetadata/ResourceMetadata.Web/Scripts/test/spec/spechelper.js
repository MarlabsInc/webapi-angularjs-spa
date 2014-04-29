function serviceHelperMock() {
    var baseUrl = config.apiurl;
    var buildUrl = function (resourceUrl) {
        return baseUrl + resourceUrl;
    };

    return {
        AuthorizationToken: buildUrl("Token"),
        Account: buildUrl('api/Account'),
        Resource: buildUrl('api/Resources/1'),
        Resources: buildUrl('api/Resources'),
        TopFiveResources: buildUrl('api/Resources?count=5'),
        setAuthroizationHeader: function (value) {
            $http.defaults.headers.common.Authorization = "Bearer " + value;
        },
        Locations: buildUrl('api/Locations'),
        Location: buildUrl('api/Locations/6'),
        ResourceActivity: buildUrl('api/Resources/1/Activities/1'),
        ResourceActivities: buildUrl('api/Resources/1/Activities')
    };
}

function locationStaticData() {
    return {
        newLocation: {
            Name: 'New Location',
            Description: 'New Location',
            CreatedOn: new Date(),
            UserId: 1
        },
        location: {
            Id: 6,
            Name: 'New Location',
            Description: 'New Location',
            CreatedOn: new Date(),
            UserId: 1
        },
        locations: [{
            Id: 1,
            Name: 'Web',
            Description: 'Online resources',
            CreatedOn: new Date(),
            UserId: 1
        }, {
            Id: 2,
            Name: 'Desktop',
            Description: 'Local files from system',
            CreatedOn: new Date(),
            UserId: 1
        }]
    };
}

var resourceStaticData = function () {
    return {
        newResource: {
            Name: "New Resource",
            Description: "Description for New Resource",
            LocationId: 1,
            Path: "http://www.adf.com",
            Priority: 3,
            CreatedOn: new Date()
        },
        addedResource: {
            Id: 7,
            Name: "New Resource",
            Description: "Description for New Resource",
            LocationId: 1,
            Path: "http://www.adf.com",
            Priority: 3,
            CreatedOn: new Date()
        },
        resource: {
            Id: 1,
            Name: "Resource1",
            Description: "Description for Resource1",
            LocationId: 1,
            Path: "http://www.adf.com",
            Priority: 3,
            CreatedOn: new Date(2014, 3, 1)
        },
        resources: [
    {
        Id: 1,
        Name: "Resource1",
        Description: "Description for Resource1",
        LocationId: 1,
        Path: "http://www.adf.com",
        Priority: 3,
        CreatedOn: new Date(2014, 3, 1)
    },
     {
         Id: 2,
         Name: "Resource2",
         Description: "Description for Resource2",
         LocationId: 1,
         Path: "http://www.adf.com",
         Priority: 3,
         CreatedOn: new Date(2014, 3, 1)
     },
      {
          Id: 3,
          Name: "Resource3",
          Description: "Description for Resource3",
          LocationId: 2,
          Path: "http://www.adf.com",
          Priority: 3,
          CreatedOn: new Date(2014, 3, 1)
      },
       {
           Id: 4,
           Name: "Resource4",
           Description: "Description for Resource4",
           LocationId: 2,
           Path: "http://www.adf.com",
           Priority: 3,
           CreatedOn: new Date(2014, 3, 1)
       },
       {
           Id: 5,
           Name: "Resource5",
           Description: "Description for Resource5",
           LocationId: 2,
           Path: "http://www.adf.com",
           Priority: 3,
           CreatedOn: new Date(2014, 3, 1)
       }
        ]
    }
}

function activityStaticData() {
    return {
        newActivity: {
            ResourceId: 1,
            Title: 'First Activity',
            Notes: null,
            ActivityDate: new Date(2014, 3, 3)
        },
        addedActivity: {
            Id: 1,
            ResourceId: 1,
            Title: 'First Activity',
            Notes: null,
            ActivityDate: new Date(2014, 3, 3)
        },
        activity: {
            Id: 1,
            ResourceId: 1,
            Title: 'First Activity',
            Notes: null,
            ActivityDate: new Date(2014, 3, 3)
        },
        activities: [{
            Id: 1,
            ResourceId: 1,
            Title: 'First Activity',
            Notes: null,
            ActivityDate: new Date(2014, 3, 3)
        }, {
            Id: 2,
            ResourceId: 1,
            Title: 'Second Activity',
            Notes: [
                "First note",
                "Second note"
            ],
            ActivityDate: new Date(2014, 3, 3)
        }
        ]
    }
}