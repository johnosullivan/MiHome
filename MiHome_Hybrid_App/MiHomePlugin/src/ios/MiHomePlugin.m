#import "MiHomePlugin.h"

#import <Cordova/CDVAvailability.h>
#import <AudioToolbox/AudioServices.h>

@implementation MiHomePlugin

- (void)pluginInitialize {
  NSLog(@"MiHomePlugin pluginInitialized");
}

- (void)echo:(CDVInvokedUrlCommand *)command {
  NSString* phrase = [command.arguments objectAtIndex:0];
  NSLog(@"%@", phrase);
  AudioServicesPlayAlertSound(kSystemSoundID_Vibrate);
}

- (void)getDate:(CDVInvokedUrlCommand *)command {
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  [dateFormatter setLocale:enUSPOSIXLocale];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];

  NSDate *now = [NSDate date];
  NSString *iso8601String = [dateFormatter stringFromDate:now];

  CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:iso8601String];
  [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
