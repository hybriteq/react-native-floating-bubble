using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Floating.Bubble.RNFloatingBubble
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNFloatingBubbleModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNFloatingBubbleModule"/>.
        /// </summary>
        internal RNFloatingBubbleModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNFloatingBubble";
            }
        }
    }
}
