#import <Cordova/CDVPlugin.h>

@interface MiHomePlugin : CDVPlugin {
}

- (void)echo:(CDVInvokedUrlCommand *)command;
- (void)getDate:(CDVInvokedUrlCommand *)command;

@end
